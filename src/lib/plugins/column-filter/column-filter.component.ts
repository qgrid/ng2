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

	filterOperators = [];
	filterOperator = '';

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
		const { column } = this;
		const { key } = column;
		const context = { key };

		const columnFilter = new ColumnFilterView(model, context);
		this.filterOperators = model.filter().operators(column);
		this.filterOperator = this.filterOperators.length && this.filterOperators[0];

		if (columnFilter.expression) {
			this.filterOperator = columnFilter.expression.op;
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

	get operatorTemplateKey() {
		const { column, filterOperator } = this;
		switch (filterOperator) {
			case 'contains': {
				return 'plugin-column-filter-search.tpl.html';
			}
			case 'between': {
				return column.type === 'date'
					? 'plugin-column-filter-date-between.tpl.html'
					: 'plugin-column-filter-between.tpl.html';
			}
			case 'isEmpty':
			case 'isNotEmpty':
			case 'isNull':
			case 'isNotNull': {
				return 'plugin-column-filter-disabled.tpl.html';
			}
			default: {
				return column.type === 'date'
					? 'plugin-column-filter-date.tpl.html'
					: 'plugin-column-filter-default.tpl.html';
			}
		}
	}

	get beautyOperatorName() {
		const { filterOperator } = this;

		if (filterOperator) {
			return this.beautifyOperatorName(filterOperator);
		}
	}

	get filterOperatorValue() {
		switch (this.filterOperator) {
			case 'isNull':
			case 'isNotNull':
			case 'isEmpty':
			case 'isNotEmpty': {
				return null;
			}
			case 'between': {
				return this.column.type === 'date'
					? this.exprValue.map(d => this.yyyymmdd(d, '-'))
					: this.exprValue;
			}
			default: {
				return this.column.type === 'date'
					? this.yyyymmdd(this.exprValue[0], '-')
					: this.exprValue[0];
			}
		}
	}

	get hasOperators() {
		return this.filterOperators && this.filterOperators.length > 1;
	}

	beautifyOperatorName(op) {
		const lcAll = op.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
		const ucFirst = lcAll.charAt(0).toUpperCase() + lcAll.slice(1);
		return ucFirst;
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
}
