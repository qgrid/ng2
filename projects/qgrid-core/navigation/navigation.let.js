import { selectColumnIndex, selectRowIndex } from './navigation.state.selector';
import { SCROLL_TO_COMMAND_KEY, FOCUS_INVALIDATE_COMMAND_KEY, FOCUS_COMMAND_KEY, BLUR_COMMAND_KEY } from '../command-bag/command.bag';

export class NavigationLet {
	constructor(plugin) {
		const { model, table, observeReply, commandPalette } = plugin;

		this.plugin = plugin;

		const scrollTo = commandPalette.get(SCROLL_TO_COMMAND_KEY);
		const invalidateFocus = commandPalette.get(FOCUS_INVALIDATE_COMMAND_KEY);
		const focus = commandPalette.get(FOCUS_COMMAND_KEY);
		const blur = commandPalette.get(BLUR_COMMAND_KEY);

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

					invalidateFocus.execute();
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

				if (e.hasChanges('rowIndex') || e.hasChanges('columnIndex')) {
					focus.execute(e.state);
				}

				if (e.hasChanges('isActive')) {
					if (e.state.isActive) {
						focus.execute();
					} else {
						blur.execute();
					}
				}
			});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('status')) {
					const { status } = e.state;
					switch (status) {
						case 'stop': {
							const navState = model.navigation();
							const rowIndex = selectRowIndex(navState);
							const columnIndex = selectColumnIndex(navState);

							if (rowIndex >= 0 && columnIndex >= 0) {
								let td = table.body.cell(rowIndex, columnIndex).model();
								this.focus.execute({
									rowIndex: td ? td.rowIndex : -1,
									columnIndex: td ? td.columnIndex : -1,
									behavior: 'core'
								});
							}

							break;
						}
					}
				}
			});
	}
}
