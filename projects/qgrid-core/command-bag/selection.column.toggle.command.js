import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { isUndefined } from '../utility/kit';
import { SELECTION_TOGGLE_COMMAND_KEY } from './selection.toggle.command';

export const SELECTION_COLUMN_TOGGLE_COMMAND_KEY = commandKey('selection.column.toggle.command');

export class SelectionColumnToggleCommand extends Command {
    constructor(plugin) {
        const { model, view, commandPalette } = plugin;
        const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);

        super({
            key: SELECTION_COLUMN_TOGGLE_COMMAND_KEY,
            execute: column => {
                const commit = toggleSelection.execute(column);
                commit();
            }
        });
    }
}
