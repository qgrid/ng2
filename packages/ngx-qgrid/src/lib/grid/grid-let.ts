import { Injectable } from '@angular/core';
import { BodyLet, ClipboardLet, CommandManager, EditLet, FilterLet, FootLet, GroupLet, HeadLet, HighlightLet, LayoutLet, NavigationLet, PaginationLet, RowDetailsLet, RowLet, ScrollLet, SelectionLet, SortLet, StyleLet, viewFactory } from '@qgrid/core';
import { GridPlugin } from '../plugin/grid-plugin';
import { ScrollService } from '../scroll/scroll.service';
import { Grid } from './grid';

@Injectable()
export class GridLet {
	body: BodyLet;
	edit: EditLet;
	filter: FilterLet;
	foot: FootLet;
	group: GroupLet;
	head: HeadLet;
	highlight: HighlightLet;
	layout: LayoutLet;
	nav: NavigationLet;
	pagination: PaginationLet;
	row: RowLet;
	rowDetails: RowDetailsLet;
	scroll: ScrollLet;
	selection: SelectionLet;
	sort: SortLet;
	style: StyleLet;
	clipboard: ClipboardLet;

	constructor(
		private qgrid: Grid,
		private scrollService: ScrollService
	) { }

	init(plugin: GridPlugin, commandManager: CommandManager) {
		const selectors = {
			th: 'q-grid-core-th',
			tr: 'q-grid-core-tr'
		};

		const injectLetServicesTo = viewFactory(
			plugin,
			commandManager,
			this.scrollService,
			selectors,
		);

		injectLetServicesTo(this);
	}
}
