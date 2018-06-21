import { Injectable, OnDestroy } from '@angular/core';
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
import { viewFactory } from 'ng2-qgrid/core/view/view.factory';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';
import { CommandManager } from 'ng2-qgrid/core/command/command.manager';
import { VScrollService } from '../../../main/core/scroll/vscroll.service';
import { GridService } from '../../../main/grid/grid.service';
import { RowView } from 'ng2-qgrid/core/row/row.view';

@Injectable()
export class ViewCoreService implements OnDestroy {
	private dispose: () => void = null;

	body: BodyView = null;
	edit: EditView = null;
	filter: FilterView = null;
	foot: FootView = null;
	group: GroupView = null;
	head: HeadView = null;
	highlight: HighlightView = null;
	layout: LayoutView = null;
	nav: NavigationView = null;
	pagination: PaginationView = null;
	pivot: PivotView = null;
	rowDetails: RowDetailsView = null;
	scroll: ScrollView = null;
	selection: SelectionView = null;
	sort: SortView = null;
	style: StyleView = null;
	row: RowView = null;
	
	constructor(
		private gridServiceFactory: GridService,
		private vscroll: VScrollService
	) { }

	init(model: Model, table: Table, commandManager: CommandManager) {
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

		this.dispose = injectViewServicesTo(this);
	}

	ngOnDestroy() {
		if (this.dispose) {
			this.dispose();
			this.dispose = null;
		}
	}
}
