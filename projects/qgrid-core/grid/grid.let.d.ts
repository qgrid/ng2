import { BodyLet } from '../body/body.let';
import { EditLet } from '../edit/edit.let';
import { FilterLet } from '../filter/filter.let';
import { FootLet } from '../foot/foot.let';
import { GroupLet } from '../group/group.let';
import { HeadLet } from '../head/head.let';
import { HighlightLet } from '../highlight/highlight.let';
import { LayoutLet } from '../layout/layout.let';
import { NavigationLet } from '../navigation/navigation.let';
import { PaginationLet as PaginationLet } from '../pagination/pagination.let';
import { RowDetailsLet as RowDetailsLet } from '../row-details/row.details.let';
import { RowLet as RowLet } from '../row/row.let';
import { ScrollLet } from '../scroll/scroll.let';
import { SelectionLet } from '../selection/selection.let';
import { SortLet } from '../sort/sort.let';
import { StyleLet } from '../style/style.let';
import { ClipboardLet } from '../clipboard/clipboard.let';

export interface GridLet {
    body: BodyLet;
    clipboard: ClipboardLet;
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
}
