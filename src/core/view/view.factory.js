import { Model } from '../infrastructure/model';
import { ModelProxy } from '../infrastructure/model.proxy';
import { Disposable } from '../infrastructure/disposable';
import { SelectionCommandManager } from '../selection/selection.command.manager';
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
import { PivotView } from '../pivot/pivot.view';
import { RowDetailsView } from '../row-details/row.details.view';
import { RowView } from '../row/row.view';
import { ScrollView } from '../scroll/scroll.view';
import { SelectionView } from '../selection/selection.view';
import { SortView } from '../sort/sort.view';
import { StyleView } from '../style/style.view';

export function viewFactory(
	model,
	table,
	commandManager,
	gridService,
	vscroll,
	selectors) {

	const proxy = new ModelProxy(model);
	const basket = new Disposable();
	const { shortcut } = model.action();
	const navigationShortuct = {
		register: commands => {
			basket.using(shortcut.register(commandManager, commands));
		},
		keyCode: () => shortcut.keyCode
	};

	const selectionCommandManager = new SelectionCommandManager(model, commandManager);
	const selectionShortcut = {
		register: commands => {
			basket.using(shortcut.register(selectionCommandManager, commands));
		}
	};

	return host => {
		const modelProxy = proxy.subject;
		host.body = new BodyView(modelProxy, table);
		host.edit = new EditView(modelProxy, table, navigationShortuct);
		host.filter = new FilterView(modelProxy);
		host.foot = new FootView(modelProxy, table);
		host.group = new GroupView(modelProxy, table, commandManager, gridService);
		host.head = new HeadView(modelProxy, table, selectors.th);
		host.highlight = new HighlightView(modelProxy, table);
		host.layout = new LayoutView(modelProxy, table, gridService);
		host.nav = new NavigationView(modelProxy, table, navigationShortuct);
		host.pagination = new PaginationView(modelProxy);
		host.pivot = new PivotView(modelProxy);
		host.row = new RowView(modelProxy, selectors.tr);
		host.rowDetails = new RowDetailsView(modelProxy, table, commandManager);
		host.scroll = new ScrollView(modelProxy, table, vscroll);
		host.selection = new SelectionView(modelProxy, table, selectionShortcut);
		host.sort = new SortView(modelProxy);
		host.style = new StyleView(modelProxy, table);

		return () => {
			host.layout.dispose();

			proxy.dispose();
			basket.dispose();
		};
	};
}