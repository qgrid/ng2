import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { selectRowIndex } from '../navigation/navigation.state.selector';
import { SELECTION_TOGGLE_COMMAND_KEY } from './selection.toggle.command';

export const SELECTION_ROW_TOGGLE_ACTIVE_COMMAND_KEY = commandKey('selection.row.toggle.active.command');

export class SelectionRowToggleActiveCommand extends Command {
    constructor(plugin) {
        const { model, table, view, commandPalette } = plugin;
        const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);

        super({
            key: SELECTION_ROW_TOGGLE_ACTIVE_COMMAND_KEY,
            shortcut: model.selection().shortcut.toggleRow,
            canExecute: () => {
                const selectionLet = view.selection;
                const rowIndex = selectRowIndex(model.navigation());
                const row = table.data.rows()[rowIndex >= 0 ? rowIndex : rowIndex + 1];
                if (!selectionLet.form.canSelect(row)) {
                    return false;
                }

                return model.selection().unit === 'row' && table.data.rows().length > 0;
            },
            execute: () => {
                const rowIndex = selectRowIndex(model.navigation());
                const row = table.data.rows()[rowIndex >= 0 ? rowIndex : rowIndex + 1];
                const commit = toggleSelection.execute(row);
                commit();
            },
        });
    }
}
