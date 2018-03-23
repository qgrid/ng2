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

@Component({
	selector: 'q-grid-column-filter',
	templateUrl: './column-filter.component.html'
})
export class ColumnFilterComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input() public key: string;
	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

	private columnFilter: ColumnFilterView;
	private vscrollContext: VscrollContext;

	constructor(
		@Optional() root: RootService,
		vscroll: VscrollService,
		qgrid: GridService) {
		super(root);

		this.vscrollContext = vscroll.context({
			fetch: (skip, take, d) => {
				if (!this.isReady()) {
					d.resolve(0);
					return;
				}

				const columnFilter = this.columnFilter;
				const model = this.model;
				const filterState = model.filter();
				const service = qgrid.service(model);
				if (filterState.fetch !== qgrid.noop) {
					const cancelBusy = service.busy();
					filterState
						.fetch(this.key, {
							value: columnFilter.getValue,
							skip: skip,
							take: take,
							filter: columnFilter.filter
						})
						.then(items => {
							columnFilter.items.push(...items);
							d.resolve(columnFilter.items.length + take);
							cancelBusy();
						})
						.catch(cancelBusy);
				} else {
					const cancelBusy = service.busy();
					const isBlank = model.filter().assertFactory().isNull;
					try {
						if (!columnFilter.items.length) {
							const source = model[model.columnFilter().source];
							let items = source().rows.map(columnFilter.getValue);
							if (columnFilter.column.type === 'array') {
								items = flatten(items);
							}

							const uniqItems = uniq(items);
							const notBlankItems = uniqItems.filter(x => !isBlank(x));
							const filteredItems = notBlankItems;

							filteredItems.sort(columnFilter.column.compare);
							columnFilter.items = filteredItems;
							columnFilter.hasBlanks =
								notBlankItems.length !== uniqItems.length &&
								(!columnFilter.filter || 'blanks'.indexOf(columnFilter.filter.toLowerCase()) >= 0);
						}

						d.resolve(columnFilter.items.length);
					}
					finally {
						cancelBusy();
					}
				}
			},

		});

	}

	public ngOnInit() {
		const model = this.model;
		const context = {
			key: this.key
		};

		this.columnFilter = new ColumnFilterView(model, context);

		this.using(this.columnFilter.submitEvent.on(() => this.submitEvent.emit()));
		this.using(this.columnFilter.cancelEvent.on(() => this.cancelEvent.emit()));

		this.context = {
			$implicit: this.columnFilter,
			vscroll: this.vscrollContext
		};

		this.vscrollContext.container.reset();
	}

	isReady() {
		return super.isReady() && !!this.columnFilter;
	}

	rowId(index: number) {
		return index;
	}

	ngOnDestroy() {
		this.columnFilter.dispose();
	}
}
