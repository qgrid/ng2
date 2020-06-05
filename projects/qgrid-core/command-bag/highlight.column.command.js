import { Command } from '../command/command';
import { commandKey } from '../command/command.key';

export const HIGHLIGHT_COLUMN_COMMAND_KEY = commandKey('highlight.column.command');

export class HighlightColumnCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: HIGHLIGHT_COLUMN_COMMAND_KEY,
            canExecute: () => model.scene().status === 'stop' && !model.drag().isActive,
            execute: ([column, state]) => {
                const columns = Array.from(model.highlight().columns);
                const index = columns.indexOf(column.key);
                let hasChanges = false;
                if (state) {
                    if (index < 0) {
                        columns.push(column.key);
                        hasChanges = true;
                    }
                }
                else {
                    if (index >= 0) {
                        columns.splice(index, 1);
                        hasChanges = true;
                    }
                }

                if (hasChanges) {
                    model.highlight({
                        columns
                    }, {
                        source: 'highlight.column.command',
                    });
                }
            }

        });
    }
}
