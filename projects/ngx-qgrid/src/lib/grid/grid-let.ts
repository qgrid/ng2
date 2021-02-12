import { Injectable } from '@angular/core';
import { BodyLet } from '@qgrid/core/body/body.let';
import { CommandLet } from '@qgrid/core/command/command.let';
import { EditLet } from '@qgrid/core/edit/edit.let';
import { FilterLet } from '@qgrid/core/filter/filter.let';
import { FootLet } from '@qgrid/core/foot/foot.let';
import { GroupLet } from '@qgrid/core/group/group.let';
import { HeadLet } from '@qgrid/core/head/head.let';
import { HighlightLet } from '@qgrid/core/highlight/highlight.let';
import { LayoutLet } from '@qgrid/core/layout/layout.let';
import { NavigationLet } from '@qgrid/core/navigation/navigation.let';
import { PaginationLet } from '@qgrid/core/pagination/pagination.let';
import { RowDetailsLet } from '@qgrid/core/row-details/row.details.let';
import { RowLet } from '@qgrid/core/row/row.let';
import { ScrollLet } from '@qgrid/core/scroll/scroll.let';
import { SelectionLet } from '@qgrid/core/selection/selection.let';
import { SortLet } from '@qgrid/core/sort/sort.let';

@Injectable()
export class GridLet {
	body: BodyLet;
	command: CommandLet;
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
}
