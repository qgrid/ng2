import { Navigation } from './navigation';
import { GRID_PREFIX } from '../definition';
import { Fastdom } from '../services/fastdom';
import { selectRow, selectColumnIndex, selectRowIndex, selectColumn } from './navigation.state.selector';
import { NavigationSite } from './navigation.site';
import { NavigationGoDownCommand } from '../command-bag/navigation.go.down.command';
import { NavigationGoDownwardCommand } from '../command-bag/navigation.go.downward.command';
import { NavigationGoEndCommand } from '../command-bag/navigation.go.end.command';
import { NavigationGoHomeCommand } from '../command-bag/navigation.go.home.command';
import { NavigationGoLeftCommand } from '../command-bag/navigation.go.left.command';
import { NavigationGoNextCommand } from '../command-bag/navigation.go.next.command';
import { NavigationGoPreviousCommand } from '../command-bag/navigation.go.previous.command';
import { NavigationGoRightCommand } from '../command-bag/navigation.go.right.command';
import { NavigationGoUpCommand } from '../command-bag/navigation.go.up.command';
import { NavigationGoUpwardCommand } from '../command-bag/navigation.go.upward.command';
import { NavigationPageDownCommand } from '../command-bag/navigation.page.down.command';
import { NavigationPageUpCommand } from '../command-bag/navigation.page.up.command';
import { NavigationFocusCommand } from '../command-bag/navigation.focus.command';
import { NavigationScrollToCommand } from '../command-bag/navigation.scroll.to.command';

export class NavigationLet {
	constructor(plugin) {
		const { model, table, observeReply, commandPalette } = plugin;

		this.plugin = plugin;

		const navSite = new NavigationSite(plugin);
		const nav = new Navigation(plugin, navSite);

		this.focus = new NavigationFocusCommand(plugin);
		this.scrollTo = new NavigationScrollToCommand(plugin);

		commandPalette.register(new NavigationGoDownCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationGoDownwardCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationGoEndCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationGoHomeCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationGoLeftCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationGoNextCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationGoPreviousCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationGoRightCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationGoUpCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationGoUpwardCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationPageDownCommand(plugin, nav, navSite));
		commandPalette.register(new NavigationPageUpCommand(plugin, nav, navSite));

		let focusBlurs = [];

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.hasChanges('cell')) {
					if (e.tag.behavior !== 'core') {
						// We need this one to toggle focus from details to main grid
						// or when user change navigation cell through the model
						if (!table.view.isFocused()) {
							table.view.focus();
						}
					}

					const rowIndex = selectRowIndex(e.state);
					const columnIndex = selectColumnIndex(e.state);

					focusBlurs = this.invalidateFocus(focusBlurs);
					if (e.tag.source !== 'navigation.scroll' && this.scrollTo.canExecute([rowIndex, columnIndex])) {
						this.scrollTo.execute([rowIndex, columnIndex]);
					}

					model.focus({
						rowIndex,
						columnIndex
					}, {
						source: 'navigation.let'
					});
				}
			});

		observeReply(model.focusChanged)
			.subscribe(e => {
				if (e.tag.source === 'navigation.let') {
					return;
				}

				if (e.hasChanges('isActive')) {
					const { view } = table;
					const activeClassName = `${GRID_PREFIX}-active`;
					if (e.state.isActive) {
						Fastdom.mutate(() => view.addClass(activeClassName));
						view.focus();
					} else {
						Fastdom.mutate(() => view.removeClass(activeClassName));
					}
				}

				if (e.hasChanges('rowIndex') || e.hasChanges('columnIndex')) {
					this.focus.execute(e.state);
				}

			});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('status')) {
					const { status } = e.state;
					switch (status) {
						case 'stop':
							const row = selectRow(model.navigation());
							const column = selectColumn(model.navigation());
							const columnIndex = selectColumnIndex(model.navigation());
							if (row && column) {
								const newRowIndex = table.data.rows().indexOf(row);
								let newColumnIndex = table.data.columns().findIndex(c => c.key === column.key);
								if (newColumnIndex < 0 && column.category === 'control') {
									newColumnIndex = columnIndex;
								}

								this.focus.execute({
									rowIndex: newRowIndex,
									columnIndex: newColumnIndex,
									behavior: 'core'
								});
							}
							break;
					}
				}
			});
	}

	invalidateFocus(dispose) {
		const { model, table } = this.plugin;

		dispose.forEach(f => f());
		dispose = [];

		const rowIndex = selectRowIndex(model.navigation());
		const columnIndex = selectColumnIndex(model.navigation());
		const cell = table.body.cell(rowIndex, columnIndex);
		if (cell.model()) {
			const row = table.body.row(rowIndex);

			Fastdom.mutate(() => {
				cell.addClass(`${GRID_PREFIX}-focused`);
				row.addClass(`${GRID_PREFIX}-focused`);
			});

			dispose.push(() => Fastdom.mutate(() => {
				cell.removeClass(`${GRID_PREFIX}-focused`);
				row.removeClass(`${GRID_PREFIX}-focused`);
			}));
		}

		return dispose;
	}
}