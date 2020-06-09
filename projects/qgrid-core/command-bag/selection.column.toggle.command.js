import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { SELECTION_TOGGLE_COMMAND_KEY } from './selection.toggle.command';

export const SELECTION_COLUMN_TOGGLE_COMMAND_KEY = commandKey('selection.column.toggle.command');

export class SelectionColumnToggleCommand extends Command {
    constructor(plugin) {
        const { commandPalette } = plugin;

        super({
            key: SELECTION_COLUMN_TOGGLE_COMMAND_KEY,
            execute: column => {
                const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);
                const commit = toggleSelection.execute(column);
                commit();
            }
        });
    }
}
