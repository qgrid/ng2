import { ModelProxy } from '../infrastructure/model.proxy';
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
	selectors,
	disposable
) {
	const proxy = new ModelProxy(model, disposable);
	const { shortcut } = model.action();
	const navigationShortcut = {
		register: commands => {
			disposable.add(shortcut.register(commandManager, commands));
		},
		keyCode: () => shortcut.keyCode
	};

	const selectionCommandManager = new SelectionCommandManager(model, commandManager);
	const selectionShortcut = {
		register: commands => {
			disposable.add(shortcut.register(selectionCommandManager, commands));
		}
	};

	return host => {
		const modelProxy = proxy.subject;

		host.head = new HeadView(modelProxy, table, selectors.th);
		host.body = new BodyView(modelProxy, table);
		host.foot = new FootView(modelProxy, table);
		host.row = new RowView(modelProxy, table, selectors.tr);
		host.layout = new LayoutView(modelProxy, table, gridService, disposable);
		host.scroll = new ScrollView(modelProxy, table, vscroll, gridService);
		host.highlight = new HighlightView(modelProxy, table);
		host.sort = new SortView(modelProxy);
		host.pagination = new PaginationView(modelProxy);
		host.nav = new NavigationView(modelProxy, table, navigationShortcut);
		host.group = new GroupView(modelProxy, table, gridService, navigationShortcut);
		host.edit = new EditView(modelProxy, table, navigationShortcut);
		host.filter = new FilterView(modelProxy);
		host.rowDetails = new RowDetailsView(modelProxy, table, navigationShortcut);
		host.selection = new SelectionView(modelProxy, table, selectionShortcut);
		host.style = new StyleView(modelProxy, table);

		return () => {
			disposable.finalize();
		};
	};
}
