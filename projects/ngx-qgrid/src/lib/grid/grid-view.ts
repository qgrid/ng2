import { Injectable } from '@angular/core';
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
import { CommandManager } from '@qgrid/core/command/command.manager';
import { Grid } from './grid';
import { GridPlugin } from '../plugin/grid-plugin';
import { ScrollService } from '../scroll/scroll.service';

@Injectable()
export class GridView {
	body: BodyView;
	edit: EditView;
	filter: FilterView;
	foot: FootView;
	group: GroupView;
	head: HeadView;
	highlight: HighlightView;
	layout: LayoutView;
	nav: NavigationView;
	pagination: PaginationView;
	row: RowView;
	rowDetails: RowDetailsView;
	scroll: ScrollView;
	selection: SelectionView;
	sort: SortView;
	style: StyleView;

	constructor(
		private qgrid: Grid,
		private scrollService: ScrollService
	) { }

	init(plugin: GridPlugin, commandManager: CommandManager) {
		const { model } = plugin;

		const gridService = this.qgrid.service(model);
		const selectors = {
			th: 'q-grid-core-th',
			tr: 'q-grid-core-tr'
		};

		const injectViewServicesTo = viewFactory(
			plugin,
			commandManager,
			gridService,
			this.scrollService,
			selectors,
		);

		injectViewServicesTo(this);
	}
}
