import {
	Input,
	Component,
	Optional,
	OnInit,
	EventEmitter,
	Output,
	OnDestroy
} from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { ColumnFilterView } from 'ng2-qgrid/plugin/column-filter/column.filter.view';
import { uniq, flatten } from 'ng2-qgrid/core/utility';
import { VscrollService } from 'ng2-qgrid/common/vscroll/vscroll.service';
import { VscrollContext } from 'ng2-qgrid/common/vscroll/vscroll.context';
import { GridService } from 'ng2-qgrid/main/grid/grid.service';
import { Fetch } from 'ng2-qgrid/core/infrastructure/fetch';
import { FocusAfterRender } from 'ng2-qgrid/plugins/focus.service';

@Component({
	selector: 'q-grid-column-filter',
	templateUrl: './column-filter.component.html',
	providers: [FocusAfterRender]
})
export class ColumnFilterComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input() public key: string;
	@Input() public search = '';

	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();


	private columnFilter: ColumnFilterView;
	private vscrollContext: VscrollContext;

	constructor(
		@Optional() root: RootService,
		private vscroll: VscrollService,
		private qgrid: GridService,
		focus: FocusAfterRender) {
		super(root);
	}

	public ngOnInit() {
		const model = this.model;
		const context = {
			key: this.key
		};

		const columnFilter = new ColumnFilterView(model, context);

		this.using(columnFilter.submitEvent.on(() => this.submitEvent.emit()));
		this.using(columnFilter.cancelEvent.on(() => this.cancelEvent.emit()));

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
						.fetch(this.key, {
							skip,
							take,
							value: columnFilter.getValue,
							filter: '' + this.search
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

		this.columnFilter = columnFilter;
		this.vscrollContext = vscrollContext;

		this.context = {
			$implicit: columnFilter,
			plugin: this,
			vscroll: vscrollContext
		};
	}

	reset() {
		this.columnFilter.items = [];
		this.vscrollContext.container.reset();
	}

	rowId(index: number) {
		return index;
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.columnFilter.dispose();
	}
}
