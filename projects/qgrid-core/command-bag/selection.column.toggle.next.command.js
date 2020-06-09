import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { selectRowIndex, selectColumnIndex } from '../navigation/navigation.state.selector';
import { SELECTION_TOGGLE_COMMAND_KEY } from './selection.toggle.command';

export const SELECTION_COLUMN_TOGGLE_NEXT_COMMAND_KEY = commandKey('selection.column.toggle.next.command');

export class SelectionColumnToggleNextCommand extends Command {
    constructor(plugin) {
        const { model, table, commandPalette } = plugin;

        super({
            key: SELECTION_COLUMN_TOGGLE_NEXT_COMMAND_KEY,
            shortcut: model.selection().shortcut.toggleNextColumn,
            canExecute: () => {
                return model.selection().unit === 'column'
                    && selectColumnIndex(model.navigation()) < table.data.columns().length - 1;
            },
            execute: () => {
                const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);
                const navigateTo = commandPalette.get(NAVIGATION_FOCUS_COMMAND_KEY);

                const rowIndex = selectRowIndex(model.navigation());
                const columnIndex = selectColumnIndex(model.navigation());

                const column = table.data.columns()[columnIndex];
                const commit = toggleSelection.execute(column);
                commit();

                const cell = {
                    rowIndex,
                    columnIndex: columnIndex + 1
                };

                if (navigateTo.canExecute(cell)) {
                    navigateTo.execute(cell);
                }
            },

        });
    }
}
