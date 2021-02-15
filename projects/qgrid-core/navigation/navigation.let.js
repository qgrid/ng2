import { selectColumnIndex, selectRowIndex } from './navigation.state.selector';
import { SCROLL_TO_COMMAND_KEY, FOCUS_INVALIDATE_COMMAND_KEY, FOCUS_COMMAND_KEY, BLUR_COMMAND_KEY } from '../command-bag/command.bag';
import { prob } from '../command/command';

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

					prob(invalidateFocus);
					if (e.tag.source !== 'navigation.scroll' && e.tag.behavior !== 'scroll') {
						prob(scrollTo, [rowIndex, columnIndex]);
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
					prob(focus, e.state);
				}

				if (e.hasChanges('isActive')) {
					if (e.state.isActive) {
						prob(focus);
					} else {
						prob(blur);
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
								prob(focus, {
									rowIndex: td ? td.rowIndex : -1,
									columnIndex: td ? td.columnIndex : -1,
								});
							}

							break;
						}
					}
				}
			});
	}
}
