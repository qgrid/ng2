import { Command } from '../command/command';
import { SELECTION_COLUMN_TOGGLE_COMMAND_KEY, SELECTION_TOGGLE_COMMAND_KEY } from './command.bag';

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
