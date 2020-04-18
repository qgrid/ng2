import { Injectable, OnDestroy } from '@angular/core';
import { GroupView } from '@qgrid/core/group/group.view';
import { FilterView } from '@qgrid/core/filter/filter.view';
import { SortView } from '@qgrid/core/sort/sort.view';
import { PaginationView } from '@qgrid/core/pagination/pagination.view';
import { HeadView } from '@qgrid/core/head/head.view';
import { BodyView } from '@qgrid/core/body/body.view';
import { FootView } from '@qgrid/core/foot/foot.view';
import { LayoutView } from '@qgrid/core/layout/layout.view';
import { SelectionView } from '@qgrid/core/selection/selection.view';
import { HighlightView } from '@qgrid/core/highlight/highlight.view';
import { EditView } from '@qgrid/core/edit/edit.view';
import { NavigationView } from '@qgrid/core/navigation/navigation.view';
import { ScrollView } from '@qgrid/core/scroll/scroll.view';
import { StyleView } from '@qgrid/core/style/style.view';
import { RowDetailsView } from '@qgrid/core/row-details/row.details.view';
import { viewFactory } from '@qgrid/core/view/view.factory';
import { RowView } from '@qgrid/core/row/row.view';
import { DomTable } from '../dom/dom';
import { CommandManager } from '@qgrid/core/command/command.manager';
import { GridModel } from './grid-model';
import { Grid } from './grid';
import { ScrollService } from '../scroll/scroll.service';
import { Disposable } from '../infrastructure/disposable';

@Injectable()
export class GridView implements OnDestroy {
	private disposable = new Disposable();

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
	rowDetails: RowDetailsView = null;
	scroll: ScrollView = null;
	selection: SelectionView = null;
	sort: SortView = null;
	style: StyleView = null;
	row: RowView = null;

	constructor(
		private qgrid: Grid,
		private scrollService: ScrollService
	) { }

	init(model: GridModel, table: DomTable, commandManager: CommandManager) {
		const gridService = this.qgrid.service(model);
		const selectors = {
			th: 'q-grid-core-th',
			tr: 'q-grid-core-tr'
		};

		const injectViewServicesTo = viewFactory(
			model,
			table,
			commandManager,
			gridService,
			this.scrollService,
			selectors,
			this.disposable
		);

		const dispose = injectViewServicesTo(this);
		this.disposable.add(() => dispose());
	}

	ngOnDestroy() {
		this.disposable.finalize();
	}
}
