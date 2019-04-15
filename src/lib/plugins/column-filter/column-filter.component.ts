import {
	Input,
	Component,
	OnInit,
	EventEmitter,
	Output,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { ColumnFilterView } from 'ng2-qgrid/plugin/column-filter/column.filter.view';
import { uniq, flatten } from 'ng2-qgrid/core/utility/kit';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { Fetch } from 'ng2-qgrid/core/infrastructure/fetch';
import { VscrollService } from '../../common/vscroll/vscroll.service';
import { VscrollContext } from '../../common/vscroll/vscroll.context';
import { FocusAfterRender } from '../../common/focus/focus.service';
import { GridService } from '../../main/grid/grid.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-column-filter',
	templateUrl: './column-filter.component.html',
	providers: [FocusAfterRender, PluginService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnFilterComponent implements OnInit {
	@Input() column: ColumnModel;
	@Input() search = '';
	@Input() exprValue = [];

	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

	dateOperatorKey = 'contains';
	dateOperators = {
		contains: {
			name: 'Contains',
			leftInputLabel: 'Find in the list',
			inputType: 'oneField'
		},
		lessThanOrEquals: {
			name: 'Before',
			leftInputLabel: 'Before than',
			inputType: 'oneField'
		},
		greaterThanOrEquals: {
			name: 'After',
			leftInputLabel: 'After than',
			inputType: 'oneField'
		},
		between: {
			name: 'Between',
			leftInputLabel: 'Since',
			rightInputLabel: 'to',
			inputType: 'twoFields'
		},
		isEmpty: {
			name: 'Is empty',
			leftInputLabel: 'Is empty',
			inputType: 'disabled'
		},
		isNotEmpty: {
			name: 'Is not empty',
			leftInputLabel: 'Is not empty',
			inputType: 'disabled'
		},
		equals: {
			name: 'Equals to',
			leftInputLabel: 'Equals to',
			inputType: 'oneField'
		},
		notEquals: {
			name: 'Not equals to',
			leftInputLabel: 'Not equals to',
			inputType: 'oneField'
		},
	};

	numberOperatorKey = 'contains';
	numberOperators = {
		contains: {
			name: 'Contains',
			leftInputLabel: 'Find in the list',
			inputType: 'oneField'
		},
		between: {
			name: 'Between',
			leftInputLabel: 'From',
			rightInputLabel: 'To',
			inputType: 'twoFields'
		},
		lessThan: {
			name: 'Less than',
			leftInputLabel: 'Less than',
			inputType: 'oneField'
		},
		lessThanOrEquals: {
			name: 'Less than or equals',
			leftInputLabel: 'Less than or equals',
			inputType: 'oneField'
		},
		greaterThan: {
			name: 'Greater than',
			leftInputLabel: 'Greater than',
			inputType: 'oneField'
		},
		greaterThanOrEquals: {
			name: 'Greater than or equals',
			leftInputLabel: 'Greater than or equals',
			inputType: 'oneField'
		},
		isEmpty: {
			name: 'Is empty',
			leftInputLabel: 'Is empty',
			inputType: 'disabled'
		},
		isNotEmpty: {
			name: 'Is not empty',
			leftInputLabel: 'Is not empty',
			inputType: 'disabled'
		},
		equals: {
			name: 'Equals to',
			leftInputLabel: 'Equals to',
			inputType: 'oneField'
		},
		notEquals: {
			name: 'Not equals to',
			leftInputLabel: 'Not equals to',
			inputType: 'oneField'
		},
	};

	context: {
		$implicit: ColumnFilterView,
		plugin: ColumnFilterComponent,
		vscroll: VscrollContext
	};

	private vscrollContext: VscrollContext;

	constructor(
		private plugin: PluginService,
		private vscroll: VscrollService,
		private qgrid: GridService,
		private cd: ChangeDetectorRef,
		focusAfterRender: FocusAfterRender) {
	}

	ngOnInit() {
		const { model } = this.plugin;
		const key = this.column.key;
		const context = { key };

		const columnFilter = new ColumnFilterView(model, context);

		if (columnFilter.expression) {
			this.numberOperatorKey = columnFilter.expression.op;
			this.dateOperatorKey = columnFilter.expression.op;
			if (columnFilter.expression.op === 'between') {
				this.exprValue = columnFilter.expression.right;
			} else {
				this.exprValue[0] = columnFilter.expression.right;
			}
		}

		columnFilter.submitEvent.on(() => this.submitEvent.emit());
		columnFilter.cancelEvent.on(() => this.cancelEvent.emit());

		const vscrollContext = this.vscroll.context({
			emit: f => {
				f();

				this.cd.markForCheck();
				this.cd.detectChanges();
			},
			threshold: model.columnFilter().threshold,
			fetch: (skip, take, d) => {
				const filterState = model.filter();
				const service = this.qgrid.service(model);
				// We need to close items property for correct reset behavior
				const items = columnFilter.items;
				if (filterState.fetch !== this.qgrid.noop) {
					const cancelBusy = service.busy();
					const select = filterState
						.fetch(key, {
							skip,
							take,
							value: columnFilter.getValue,
							search: '' + this.search,

							// @deprecated
							filter: '' + this.search,
						});

					const fetch = new Fetch(select);
					fetch.run();
					fetch.busy
						.then(page => {
							items.push(...page);
							d.resolve(items.length + (page.length === take ? take : 0));
							cancelBusy();
						})
						.catch(cancelBusy);
				} else {
					const cancelBusy = service.busy();
					const isBlank = model.filter().assertFactory().isNull;
					try {
						if (!items.length) {
							const source = model[model.columnFilter().source];
							let values = source().rows.map(columnFilter.getValue);
							if (columnFilter.column.type === 'array') {
								values = flatten(values);
							}

							const uniqValues = uniq(values);
							const notBlankValues = uniqValues.filter(x => !isBlank(x));

							// TODO: improve search also
							const search = ('' + this.search).toLowerCase();
							const filteredItems = search
								? notBlankValues.filter(x => ('' + x).toLowerCase().indexOf(search) >= 0)
								: notBlankValues;

							filteredItems.sort(columnFilter.column.compare);
							columnFilter.items = filteredItems;
							columnFilter.hasBlanks =
								notBlankValues.length !== uniqValues.length &&
								(!search || 'blanks'.indexOf(search.toLowerCase()) >= 0);
						}

						d.resolve(columnFilter.items.length);
					}
					finally {
						cancelBusy();
					}
				}
			},
		});

		this.vscrollContext = vscrollContext;

		this.context = {
			$implicit: columnFilter,
			plugin: this,
			vscroll: vscrollContext
		};
	}

	reset() {
		this.context.$implicit.items = [];
		this.vscrollContext.container.reset();
	}

	clear() {
		this.search = '';
		this.exprValue = [];
		this.context.$implicit.reset.execute();
	}

	addChipFromInput($event) {
		this.exprValue.push($event.value);
		const containsSimilar = this.exprValue.some((x, i, arr) => arr.indexOf(x) < i);
		if (!containsSimilar) {
			$event.input.value = '';
		}
		this.exprValue = this.exprValue.filter((x, i, arr) => arr.indexOf(x) === i);;
	}

	get templateKey() {
		const { column } = this;
		if (column && (column.type === 'number' || column.type === 'date')) {
			return `plugin-column-filter-${column.type}.tpl.html`;
		}

		return `plugin-column-filter.tpl.html`;
	}

	get numberOperatorsKeys() {
		return Object.keys(this.numberOperators);
	}

	get dateOperatorsKeys() {
		return Object.keys(this.dateOperators);
	}

	get currentOperator() {
		const { column } = this;
		return column.type === 'date' ? this.dateOperators[this.dateOperatorKey] : this.numberOperators[this.numberOperatorKey];
	}

	yyyymmdd(date, separator) {
		if (!date || !date.getFullYear) {
			return date;
		}
		const yyyy = date.getFullYear();
		const mm = (date.getMonth() + 1).toString().padStart(2, '0');
		const dd = date.getDate().toString().padStart(2, '0');
		return [yyyy, mm, dd].join(separator);
	}

	get value() {
		switch (this.currentOperator.inputType) {
			case 'oneField':
				return this.column.type === 'date'
					? this.yyyymmdd(this.exprValue[0], '-')
					: this.exprValue[0];
			case 'disabled':
				return null;
			case 'twoFields':
				return this.column.type === 'date'
					? this.exprValue.map(d => this.yyyymmdd(d, '-'))
					: this.exprValue;
			default: throw new Error(`Unknown operator type ${this.currentOperator.inputType}`);
		}
	}
}
