import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { selectRowIndex, selectColumnIndex } from '../navigation/navigation.state.selector';
import { SELECTION_TOGGLE_COMMAND_KEY } from './selection.toggle.command';
import { NAVIGATION_FOCUS_COMMAND_KEY } from './navigation.focus.command';

export const SELECTION_ROW_TOGGLE_NEXT_COMMAND_KEY = commandKey('selection.row.toggle.next.command');

export class SelectionRowToggleNextCommand extends Command {
    constructor(plugin) {
        const { model, table, commandPalette } = plugin;

        super({
            key: SELECTION_ROW_TOGGLE_NEXT_COMMAND_KEY,
            shortcut: model.selection().shortcut.toggleNextRow,
            canExecute: () => {
                return model.selection().unit === 'row'
                    && selectRowIndex(model.navigation()) < table.data.rows().length;
            },
            execute: () => {
                const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);
                const navigateTo = commandPalette.get(NAVIGATION_FOCUS_COMMAND_KEY);

                const rowIndex = selectRowIndex(model.navigation());
                const columnIndex = selectColumnIndex(model.navigation());

                const row = table.data.rows()[rowIndex];
                const commit = toggleSelection.execute(row);
                commit();

                const cell = {
                    rowIndex: rowIndex + 1,
                    columnIndex
                };

                if (navigateTo.canExecute(cell)) {
                    navigateTo.execute(cell);
                }
            },
        });
    }
}
