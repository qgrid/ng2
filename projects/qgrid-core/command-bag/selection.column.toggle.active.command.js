import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { selectColumnIndex } from '../navigation/navigation.state.selector';
import { SELECTION_TOGGLE_COMMAND_KEY } from './selection.toggle.command';

export const SELECTION_COLUMN_TOGGLE_ACTIVE_COMMAND_KEY = commandKey('selection.column.toggle.active.command');

export class SelectionColumnToggleActiveCommand extends Command {
    constructor(plugin) {
        const { model, table, commandPalette } = plugin;

        super({
            key: SELECTION_COLUMN_TOGGLE_ACTIVE_COMMAND_KEY,
            shortcut: model.selection().shortcut.toggleColumn,
            canExecute: () => {
                return model.selection().unit === 'column'
                    && selectColumnIndex(model.navigation()) >= 0;
            },
            execute: () => {
                const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);

                const columnIndex = selectColumnIndex(model.navigation());

                const column = table.data.columns()[columnIndex];
                const commit = toggleSelection.execute(column);
                commit();
            },
        });
    }
}
