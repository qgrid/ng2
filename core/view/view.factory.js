import {BodyView} from '../body';
import {HeadView} from '../head';
import {FootView} from '../foot';
import {LayoutView} from '../layout';
import {GroupView} from '../group';
import {PivotView} from '../pivot';
import {NavigationView} from '../navigation';
import {HighlightView} from '../highlight';
import {SortView} from '../sort';
import {FilterView} from '../filter';
import {EditView} from '../edit';
import {SelectionView} from '../selection';
import {PaginationView} from '../pagination';
import {StyleView} from '../style';
import {ColumnView} from '../column';
import {ScrollView} from '../scroll';
import {RowDetailsView} from '../row-details';

export function viewFactory(model, table, commandManager, gridService, vscroll, selectors){
	return (target) => {
		target.style = new StyleView(model, table);
		target.head = new HeadView(model, table, selectors.th);
		target.body = new BodyView(model, table);
		target.foot = new FootView(model, table);
		target.columns = new ColumnView(model, gridService);
		target.layout = new LayoutView(model, table, gridService);
		target.selection = new SelectionView(model, table, commandManager, gridService);
		target.group = new GroupView(model, table, commandManager, gridService);
		target.pivot = new PivotView(model);
		target.highlight = new HighlightView(model, table);
		target.sort = new SortView(model);
		target.filter = new FilterView(model);
		target.edit = new EditView(model, table, commandManager);
		target.nav = new NavigationView(model, table, commandManager);
		target.pagination = new PaginationView(model);
		target.scroll = new ScrollView(model, table, vscroll, gridService);
		target.rowDetails = new RowDetailsView(model, table, commandManager, gridService);

		return () => {
			target.style.dispose();
			target.head.dispose();
			target.body.dispose();
			target.foot.dispose();
			target.columns.dispose();
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