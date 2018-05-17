import { Injectable } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
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
import { ClipboardView } from 'ng2-qgrid/core/clipboard/clipboard.view';
import { HighlightView } from 'ng2-qgrid/core/highlight/highlight.view';
import { EditView } from 'ng2-qgrid/core/edit/edit.view';
import { NavigationView } from 'ng2-qgrid/core/navigation/navigation.view';
import { ScrollView } from 'ng2-qgrid/core/scroll/scroll.view';
import { StyleView } from 'ng2-qgrid/core/style/style.view';
import { RowDetailsView } from 'ng2-qgrid/core/row-details/row.details.view';
import { noop } from 'ng2-qgrid/core/utility/index';
import { viewFactory } from 'ng2-qgrid/core/view/view.factory';
import { RootService } from '../../../infrastructure/component/root.service';
import { VScrollService } from '../../../main/core/scroll/vscroll.service';
import { GridService } from '../../../main/grid/grid.service';

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
	public clipboard: ClipboardView = null;
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
