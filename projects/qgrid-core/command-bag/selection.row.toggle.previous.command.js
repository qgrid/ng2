import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { selectRowIndex, selectColumnIndex } from '../navigation/navigation.state.selector';
import { SELECTION_TOGGLE_COMMAND_KEY } from './selection.toggle.command';
import { NAVIGATION_FOCUS_COMMAND_KEY } from './navigation.focus.command.d copy';

export const SELECTION_ROW_TOGGLE_PREVIOUS_COMMAND_KEY = commandKey('selection.row.toggle.previous.command');

export class SelectionRowTogglePreviousCommand extends Command {
    constructor(plugin) {
        const { model, table, commandPalette } = plugin;
        const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);
        const navigateTo = commandPalette.get(NAVIGATION_FOCUS_COMMAND_KEY);

        super({
            key: SELECTION_ROW_TOGGLE_PREVIOUS_COMMAND_KEY,
            shortcut: model.selection().shortcut.togglePreviousRow,
            canExecute: () => {
                return model.selection().unit === 'row'
                    && selectRowIndex(model.navigation()) > 0;
            },
            execute: () => {
                const rowIndex = selectRowIndex(model.navigation());
                const columnIndex = selectColumnIndex(model.navigation());

                const row = table.data.rows()[rowIndex];
                const commit = toggleSelection.execute(row);
                commit();

                const cell = {
                    rowIndex: rowIndex - 1,
                    columnIndex
                };

                if (navigateTo.canExecute(cell)) {
                    navigateTo.execute(cell);
                }
            },
        });
    }
}
