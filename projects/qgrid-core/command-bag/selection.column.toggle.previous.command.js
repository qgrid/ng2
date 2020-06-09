import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { selectRowIndex, selectColumnIndex } from '../navigation/navigation.state.selector';
import { SELECTION_TOGGLE_COMMAND_KEY } from './selection.toggle.command';

export const SELECTION_COLUMN_TOGGLE_PREVIOUS_COMMAND_KEY = commandKey('selection.column.toggle.previous.command');

export class SelectionColumnTogglePreviousCommand extends Command {
    constructor(plugin) {
        const { model, table, commandPalette } = plugin;
        const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);
        const navigateTo = commandPalette.get(NAVIGATION_FOCUS_COMMAND_KEY);

        super({
            key: SELECTION_COLUMN_TOGGLE_PREVIOUS_COMMAND_KEY,
            shortcut: model.selection().shortcut.togglePreviousColumn,
            canExecute: () => {
                return model.selection().unit === 'column' && selectColumnIndex(model.navigation()) > 0;
            },
            execute: () => {
                const rowIndex = selectRowIndex(model.navigation());
                const columnIndex = selectColumnIndex(model.navigation());

                const column = table.data.columns()[columnIndex];
                const commit = toggleSelection.execute(column);
                commit();

                this.navigateTo(rowIndex, columnIndex - 1);
            }
        });
    }
}
