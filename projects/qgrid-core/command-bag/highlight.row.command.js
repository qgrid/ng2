import { Command } from '../command/command';
import { commandKey } from '../command/command.key';

export const HIGHLIGHT_ROW_COMMAND_KEY = commandKey('highlight.row.command');

export class HighlightRowCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: HIGHLIGHT_ROW_COMMAND_KEY,
            canExecute: () => model.scene().status === 'stop' && !model.drag().isActive,
            execute: ([row, state]) => {
				const rows = Array.from(model.highlight().rows);
				const index = rows.indexOf(row);
				let hasChanges = false;
				if (state) {
					if (index < 0) {
						rows.push(row);
						hasChanges = true;
					}
				}
				else {
					if (index >= 0) {
						rows.splice(index, 1);
						hasChanges = true;
					}
				}

				if (hasChanges) {
					model.highlight({ 
                        rows 
                    }, {
						source: 'highlight.row.command'
					});
				}
			}
        });
    }
}
