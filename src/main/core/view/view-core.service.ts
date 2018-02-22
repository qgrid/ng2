import { Injectable } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure';
import { GroupView } from 'ng2-qgrid/core/group/group.view';
import { FilterView } from 'ng2-qgrid/core/filter/filter.view';
import { PivotView } from 'ng2-qgrid/core/pivot/pivot.view';
import { SortView } from 'ng2-qgrid/core/sort/sort.view';
import { PaginationView } from 'ng2-qgrid/core/pagination/pagination.view';
import { HeadView } from 'ng2-qgrid/core/head/head.view';
import { BodyView } from 'ng2-qgrid/core/body/body.view';
import { FootView } from 'ng2-qgrid/core/foot/foot.view';
import { LayoutView } from 'ng2-qgrid/core/layout/layout.view';
import { SelectionView } from 'ng2-qgrid/core/selection/selection.view';
import { HighlightView } from 'ng2-qgrid/core/highlight/highlight.view';
import { EditView } from 'ng2-qgrid/core/edit/edit.view';
import { NavigationView } from 'ng2-qgrid/core/navigation/navigation.view';
import { ScrollView } from 'ng2-qgrid/core/scroll/scroll.view';
import { StyleView } from 'ng2-qgrid/core/style/style.view';
import { RowDetailsView } from 'ng2-qgrid/core/row-details/row.details.view';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { GridService } from 'ng2-qgrid/main/grid/grid.service';
import { VScrollService } from 'ng2-qgrid/main/core/scroll/vscroll.service';
import { viewFactory } from 'ng2-qgrid/core/view/view.factory';
import { noop } from 'ng2-qgrid/core/utility';

@Injectable()
export class ViewCoreService {
	public destroy = noop;

	public group: GroupView = null;
	public filter: FilterView = null;
	public pivot: PivotView = null;
	public sort: SortView = null;
	public pagination: PaginationView = null;
	public head: HeadView = null;
	public body: BodyView = null;
	public foot: FootView = null;
	public layout: LayoutView = null;
	public selection: SelectionView = null;
	public highlight: HighlightView = null;
	public edit: EditView = null;
	public nav: NavigationView = null;
	public scroll: ScrollView = null;
	public style: StyleView = null;
	public rowDetails: RowDetailsView = null;

	constructor(
		private root: RootService,
		private gridServiceFactory: GridService,
		private vscroll: VScrollService
	) { }

	init() {
		const root = this.root;
		const model = root.model;
		const table = root.table;
		const commandManager = root.commandManager;
		const gridService = this.gridServiceFactory.service(model);
		const selectors = {
			th: 'q-grid-core-th',
			tr: 'q-grid-core-tr'
		};

		const injectViewServicesTo = viewFactory(
			model,
			table,
			commandManager,
			gridService,
			this.vscroll,
			selectors
		);

		this.destroy = injectViewServicesTo(this);
	}
}
