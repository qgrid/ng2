import { SelectionCommandManager } from '../selection/selection.command.manager';
import { BodyLet } from '../body/body.let';
import { EditLet } from '../edit/edit.let';
import { FilterLet } from '../filter/filter.let';
import { FootLet } from '../foot/foot.let';
import { GroupLet } from '../group/group.let';
import { HeadLet } from '../head/head.let';
import { HighlightLet } from '../highlight/highlight.let';
import { LayoutLet } from '../layout/layout.let';
import { NavigationLet } from '../navigation/navigation.let';
import { PaginationLet } from '../pagination/pagination.let';
import { RowDetailsLet } from '../row-details/row.details.let';
import { RowLet } from '../row/row.let';
import { ScrollLet } from '../scroll/scroll.let';
import { SelectionLet } from '../selection/selection.let';
import { SortLet } from '../sort/sort.let';
import { StyleLet } from '../style/style.let';

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
		keyCode: () => shortcut.keyCode,
		register: commands =>
			disposable.add(
				shortcut.register(
					commandManager,
					commands
				)
			),
	};

	const selectionCommandManager =
		new SelectionCommandManager(
			model,
			commandManager
		);

	const selectionShortcut = {
		register: commands => {
			disposable.add(
				shortcut.register(
					selectionCommandManager,
					commands
				)
			);
		}
	};

	return host => {
		host.head = new HeadLet(plugin, selectors.th);
		host.body = new BodyLet(plugin);
		host.foot = new FootLet(plugin);
		host.row = new RowLet(plugin, selectors.tr);
		host.layout = new LayoutLet(plugin, gridService);
		host.scroll = new ScrollLet(plugin, vscroll, gridService);
		host.highlight = new HighlightLet(plugin);
		host.sort = new SortLet(plugin);
		host.pagination = new PaginationLet(plugin);
		host.nav = new NavigationLet(plugin, navigationShortcut);
		host.group = new GroupLet(plugin, gridService, navigationShortcut);
		host.edit = new EditLet(plugin, navigationShortcut);
		host.filter = new FilterLet(plugin);
		host.rowDetails = new RowDetailsLet(plugin, navigationShortcut);
		host.selection = new SelectionLet(plugin, selectionShortcut);
		host.style = new StyleLet(plugin);
	};
}
