import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { HIGHLIGHT_ROW_COMMAND_KEY } from './highlight.row.command';
import { HIGHLIGHT_COLUMN_COMMAND_KEY } from './highlight.column.command';
import { HIGHLIGHT_CELL_COMMAND_KEY } from './highlight.cell.command';

export const HIGHLIGHT_CLEAR_COMMAND_KEY = commandKey('highlight.clear.command');

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
