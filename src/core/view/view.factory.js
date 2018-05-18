import { BodyView } from '../body/body.view';
import { HeadView } from '../head/head.view';
import { FootView } from '../foot/foot.view';
import { LayoutView } from '../layout/layout.view';
import { GroupView } from '../group/group.view';
import { PivotView } from '../pivot/pivot.view';
import { NavigationView } from '../navigation/navigation.view';
import { HighlightView } from '../highlight/highlight.view';
import { SortView } from '../sort/sort.view';
import { FilterView } from '../filter/filter.view';
import { EditView } from '../edit/edit.view';
import { SelectionView } from '../selection/selection.view';
import { PaginationView } from '../pagination/pagination.view';
import { StyleView } from '../style/style.view';
import { ScrollView } from '../scroll/scroll.view';
import { RowDetailsView } from '../row-details/row.details.view';
import { RowView } from '../row/row.view';

export function viewFactory(model, table, commandManager, gridService, vscroll, selectors) {
	return target => {
		target.style = new StyleView(model, table);
		target.head = new HeadView(model, table, selectors.th);
		target.body = new BodyView(model, table);
		target.foot = new FootView(model, table);
		target.layout = new LayoutView(model, table, gridService);
		target.selection = new SelectionView(model, table, commandManager);
		target.group = new GroupView(model, table, commandManager, gridService);
		target.pivot = new PivotView(model);
		target.highlight = new HighlightView(model, table);
		target.sort = new SortView(model);
		target.filter = new FilterView(model);
		target.edit = new EditView(model, table, commandManager);
		target.nav = new NavigationView(model, table, commandManager);
		target.pagination = new PaginationView(model);
		target.scroll = new ScrollView(model, table, vscroll);
		target.rowDetails = new RowDetailsView(model, table, commandManager);
		target.row = new RowView(model, selectors.tr);

		return () => {
			target.style.dispose();
			target.head.dispose();
			target.body.dispose();
			target.foot.dispose();
			target.layout.dispose();
			target.selection.dispose();
			target.group.dispose();
			target.pivot.dispose();
			target.highlight.dispose();
			target.sort.dispose();
			target.filter.dispose();
			target.edit.dispose();
			target.nav.dispose();
			target.pagination.dispose();
			target.scroll.dispose();
			target.rowDetails.dispose();
		};
	};
}