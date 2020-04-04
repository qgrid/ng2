import {
	Input,
	Component,
	OnInit,
	EventEmitter,
	Output,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { ColumnFilterView } from 'qgrid/plugins/column-filter/column.filter.view';
import { uniq, flatten } from 'qgrid/core/utility/kit';
import { ColumnModel } from 'qgrid/core/column-type/column.model';
import { Fetch } from 'qgrid/core/infrastructure/fetch';
import { FocusAfterRender } from '../focus/focus.service';
import { GridPlugin } from 'ngx-qgrid';
import { Grid, VscrollService, VscrollContext } from 'ngx-qgrid';

@Component({
	selector: 'q-grid-column-filter',
	templateUrl: './column-filter.component.html',
	providers: [FocusAfterRender, GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnFilterComponent implements OnInit {
	@Input() column: ColumnModel;
	@Input() search = '';

	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

	context: {
		$implicit: ColumnFilterView,
		plugin: ColumnFilterComponent,
		vscroll: VscrollContext
	};

	private vscrollContext: VscrollContext;

	constructor(
		private plugin: GridPlugin,
		private vscroll: VscrollService,
		private qgrid: Grid,
		private cd: ChangeDetectorRef,
		focusAfterRender: FocusAfterRender) {
	}

	get operators() {
		return this.plugin.model.filter().operatorFactory(this.column);
	}

	ngOnInit() {
		const { model } = this.plugin;
		const { key } = this.column;
		const context = { key };

		const columnFilter = new ColumnFilterView(model, context);

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
		this.context.$implicit.reset.execute();
	}

	operatorTemplateKey(op) {
		let key;
		switch (op) {
			case 'isEmpty':
			case 'isNotEmpty':
			case 'isNull':
			case 'isNotNull': {
				key = 'default-disabled';
				break;
			}
			case 'contains': {
				key = 'default-contains';
				break;
			}
			case 'between': {
				key = this.column.type === 'date' ? 'date-between' : 'default-between';
				break;
			}
			default: {
				key = this.column.type === 'date' ? 'date' : 'default';
				break;
			}
		}
		return `plugin-column-filter-${key}.tpl.html`;
	}

	get hasOperators() {
		return this.operators && this.operators.length > 1;
	}
}
