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
	plugin,
	commandManager,
	gridService,
	vscroll,
	selectors
) {
	const { model, table, disposable } = plugin;
	const { shortcut } = model.action();

	const navigationShortcut = {
		register: commands => disposable.add(shortcut.register(commandManager, commands)),
		keyCode: () => shortcut.keyCode
	};

	const selectionCommandManager =
		new SelectionCommandManager(
			model,
			commandManager
		);

	const selectionShortcut = {
		register: commands => {
			disposable.add(
				shortcut.register(selectionCommandManager, commands)
			);
		}
	};

	return host => {
		host.head = new HeadView(plugin, selectors.th);
		host.body = new BodyView(plugin);
		host.foot = new FootView(plugin);
		host.row = new RowView(model, table, selectors.tr);
		host.layout = new LayoutView(model, table, gridService, disposable);
		host.scroll = new ScrollView(model, table, vscroll, gridService);
		host.highlight = new HighlightView(model, table);
		host.sort = new SortView(model);
		host.pagination = new PaginationView(model);
		host.nav = new NavigationView(model, table, navigationShortcut);
		host.group = new GroupView(model, table, gridService, navigationShortcut);
		host.edit = new EditView(model, table, navigationShortcut);
		host.filter = new FilterView(model);
		host.rowDetails = new RowDetailsView(model, table, navigationShortcut);
		host.selection = new SelectionView(model, table, selectionShortcut);
		host.style = new StyleView(model, table);
	};
}
