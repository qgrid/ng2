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
	@Input() rightSearch = '';

	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

	numberOperatorKey = 'contains';
	numberOperators = {
		contains: {
			icon: '⌕',
			name: 'Contains',
			leftInputLabel: 'Find in the list'
		},
		isEmpty: {
			icon: '∅',
			name: 'Is empty'
		},
		isNotEmpty: {
			icon: 'O',
			name: 'Is not empty'
		},
		equals: {
			icon: '=',
			name: 'Equals to',
			leftInputLabel: 'Equals to'
		},
		in: {
			icon: '^',
			name: 'In range',
			leftInputLabel: 'Range'
		},
		notEquals: {
			icon: '≠',
			name: 'Not equals to',
			leftInputLabel: 'Not equals to'
		},
		between: {
			icon: '…',
			name: 'Between',
			leftInputLabel: 'From',
			rightInputLabel: 'To',
		},
		lessThan: {
			icon: '<',
			name: 'Less than',
			leftInputLabel: 'Less than'
		},
		lessThanOrEquals: {
			icon: '≤',
			name: 'Less than or equals',
			leftInputLabel: 'Less than or equals'
		},
		greaterThan: {
			icon: '>',
			name: 'Greater than',
			leftInputLabel: 'Greater than'
		},
		greaterThanOrEquals: {
			icon: '≥',
			name: 'Greater than or equals',
			leftInputLabel: 'Greater than or equals'
		},
	};

	get numberOperatorsKeys() { 
		return Object.keys(this.numberOperators);
	}

	get currentOperator() {
		return this.numberOperators[this.numberOperatorKey];
	}

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
			if (Array.isArray(columnFilter.expression.right)) {
				this.search = columnFilter.expression.right[0];
				this.rightSearch = columnFilter.expression.right[1];
			} else {
				this.search = columnFilter.expression.right;
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

	get templateKey() {
		const { column } = this;
		if (column && (column.type === 'number' || column.type === 'date')) {
			return `plugin-column-filter-${column.type}.tpl.html`;
		}

		return `plugin-column-filter.tpl.html`;
	}
}
