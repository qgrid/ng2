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
import { Model } from '../infrastructure/model';
import { ModelProxy } from '../infrastructure/model.proxy';
import { Disposable } from '../infrastructure/disposable';
import { SelectionCommandManager } from '../selection/selection.command.manager';

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
		host.style = new StyleView(proxy.subject, table);
		host.head = new HeadView(proxy.subject, table, selectors.th);
		host.body = new BodyView(proxy.subject, table);
		host.foot = new FootView(proxy.subject, table);
		host.layout = new LayoutView(proxy.subject, table, gridService);
		host.selection = new SelectionView(proxy.subject, table, selectionShortcut);
		host.group = new GroupView(proxy.subject, table, commandManager, gridService);
		host.pivot = new PivotView(proxy.subject);
		host.highlight = new HighlightView(proxy.subject, table);
		host.sort = new SortView(proxy.subject);
		host.filter = new FilterView(proxy.subject);
		host.edit = new EditView(proxy.subject, table, navigationShortuct);
		host.nav = new NavigationView(proxy.subject, table, navigationShortuct);
		host.pagination = new PaginationView(proxy.subject);
		host.scroll = new ScrollView(proxy.subject, table, vscroll);
		host.rowDetails = new RowDetailsView(proxy.subject, table, commandManager);
		host.row = new RowView(proxy.subject, selectors.tr);

		return () => {
			host.layout.dispose();

			proxy.dispose();
			basket.dispose();
		};
	};
}