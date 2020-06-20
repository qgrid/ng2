import { GRID_PREFIX } from '../definition';
import { Fastdom } from '../services/fastdom';
import { selectColumnIndex, selectRowIndex } from './navigation.state.selector';
import { SCROLL_TO_COMMAND_KEY } from '../command-bag/command.bag';

export class NavigationLet {
	constructor(plugin) {
		const { model, table, observeReply, commandPalette } = plugin;

		this.plugin = plugin;
		let focusBlurs = [];

		const scrollTo = commandPalette.get(SCROLL_TO_COMMAND_KEY);
		
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
					if (e.tag.source !== 'navigation.scroll' && scrollTo.canExecute([rowIndex, columnIndex])) {
						scrollTo.execute([rowIndex, columnIndex]);
					}
				}
			});

		observeReply(model.focusChanged)
			.subscribe(e => {
				if (e.tag.source === 'focus.command' ||
					e.tag.source === 'blur.command') {
					return;
				}

				if (e.hasChanges('isActive')) {

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