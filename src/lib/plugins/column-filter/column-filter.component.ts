import {
	Input,
	Component,
	Optional,
	OnInit,
	EventEmitter,
	Output,
	OnDestroy
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
	providers: [FocusAfterRender, PluginService]
})
export class ColumnFilterComponent implements OnInit {
	@Input() public column: ColumnModel;
	@Input() public search = '';

	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

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
		focusAfterRender: FocusAfterRender) {
	}

	ngOnInit() {
		const { model } = this.plugin;
		const key = this.column.key;
		const context = { key };

		const columnFilter = new ColumnFilterView(model, context);

		columnFilter.submitEvent.on(() => this.submitEvent.emit());
		columnFilter.cancelEvent.on(() => this.cancelEvent.emit());

		const vscrollContext = this.vscroll.context({
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

							// @depricated
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
							let items = source().rows.map(columnFilter.getValue);
							if (columnFilter.column.type === 'array') {
								items = flatten(items);
							}

							const uniqItems = uniq(items);
							const notBlankItems = uniqItems.filter(x => !isBlank(x));

							// TODO: improve search algo
							const search = ('' + this.search).toLowerCase();
							const filteredItems = search
								? notBlankItems.filter(x => ('' + x).toLowerCase().indexOf(search) >= 0)
								: notBlankItems;

							filteredItems.sort(columnFilter.column.compare);
							columnFilter.items = filteredItems;
							columnFilter.hasBlanks =
								notBlankItems.length !== uniqItems.length &&
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

	rowId(index: number) {
		return index;
	}
}
