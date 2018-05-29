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
		host.body = new BodyView(proxy.subject, table);
		host.edit = new EditView(proxy.subject, table, navigationShortuct);
		host.filter = new FilterView(proxy.subject);
		host.foot = new FootView(proxy.subject, table);
		host.group = new GroupView(proxy.subject, table, commandManager, gridService);
		host.head = new HeadView(proxy.subject, table, selectors.th);
		host.highlight = new HighlightView(proxy.subject, table);
		host.layout = new LayoutView(proxy.subject, table, gridService);
		host.nav = new NavigationView(proxy.subject, table, navigationShortuct);
		host.pagination = new PaginationView(proxy.subject);
		host.pivot = new PivotView(proxy.subject);
		host.row = new RowView(proxy.subject, selectors.tr);
		host.rowDetails = new RowDetailsView(proxy.subject, table, commandManager);
		host.scroll = new ScrollView(proxy.subject, table, vscroll);
		host.selection = new SelectionView(proxy.subject, table, selectionShortcut);
		host.sort = new SortView(proxy.subject);
		host.style = new StyleView(proxy.subject, table);

		return () => {
			host.layout.dispose();

			proxy.dispose();
			basket.dispose();
		};
	};
}