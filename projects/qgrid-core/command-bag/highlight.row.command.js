import { Command } from '../command/command';
import { HIGHLIGHT_ROW_COMMAND_KEY } from './command.bag';

export class HighlightRowCommand extends Command {
	constructor(plugin) {
		const { model } = plugin;

		super({
			key: HIGHLIGHT_ROW_COMMAND_KEY,
			canExecute: ([rowIndex, state]) => {
				if (state) {
					if (model.scene().status !== 'stop' || model.drag().isActive) {
						return false;
					}

					return model.highlight().rows.indexOf(rowIndex) < 0;
				}

				return model.highlight().rows.indexOf(rowIndex) >= 0;
			},
			execute: ([rowIndex, state]) => {
				const highlightedRows = Array.from(model.highlight().rows);
				const highlightedIndex = highlightedRows.indexOf(rowIndex);
				
				let hasChanges = false;
				if (state) {
					if (highlightedIndex < 0) {
						highlightedRows.push(rowIndex);
						hasChanges = true;
					}
				}
				else {
					if (highlightedIndex >= 0) {
						highlightedRows.splice(highlightedIndex, 1);
						hasChanges = true;
					}
				}

				if (hasChanges) {
					model.highlight({
						rows: highlightedRows
					}, {
						source: 'highlight.row.command'
					});
				}
			}
		});
	}
}
