import { BodyView } from '../body/body.view';
import { EditView } from '../edit/edit.view';
import { FilterView } from '../filter/filter.view';
import { FootView } from '../foot/foot.view';
import { GroupView } from '../group/group.view';
import { HeadView } from '../head/head.view';
import { HighlightView } from '../highlight/highlight.view';
import { LayoutView } from '../layout/layout.view';
import { NavigationView } from '../navigation/navigation.view';
import { PaginationView } from '../pagination/pagination.view';
import { RowDetailsView } from '../row-details/row.details.view';
import { RowView } from '../row/row.view';
import { ScrollView } from '../scroll/scroll.view';
import { SelectionView } from '../selection/selection.view';
import { SortView } from '../sort/sort.view';
import { StyleView } from '../style/style.view';

export interface GridView {
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
}
