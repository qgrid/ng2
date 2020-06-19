import { Command } from '../command/command';
import { 
	HIGHLIGHT_ROW_COMMAND_KEY,
	HIGHLIGHT_COLUMN_COMMAND_KEY,
	HIGHLIGHT_CELL_COMMAND_KEY,
	HIGHLIGHT_CLEAR_COMMAND_KEY,
 } from './command.bag';

export class HighlightClearCommand extends Command {
	constructor(plugin) {
		const { model, commandPalette } = plugin;

		super({
			key: HIGHLIGHT_CLEAR_COMMAND_KEY,
			execute: () => {
				const { rows, columns, cell } = model.highlight();

				const highlightRow = commandPalette.get(HIGHLIGHT_ROW_COMMAND_KEY);
				const highlightColumn = commandPalette.get(HIGHLIGHT_COLUMN_COMMAND_KEY);
				const highlightCell = commandPalette.get(HIGHLIGHT_CELL_COMMAND_KEY);

				rows.forEach(row => highlightRow.execute([row, false]));
				columns.forEach(column => highlightColumn.execute([column, false]));

				if (cell) {
					highlightCell.execute(null);
				}
			}
		});
	}
}
