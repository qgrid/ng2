import { Command } from '../command/command';
import { selectRowIndex } from '../navigation/navigation.state.selector';
import { SELECTION_ROW_TOGGLE_ACTIVE_COMMAND_KEY, SELECTION_TOGGLE_COMMAND_KEY } from './command.bag';

export class SelectionRowToggleActiveCommand extends Command {
    constructor(plugin) {
        const { model, table, view, commandPalette } = plugin;

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
                const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);

                const rowIndex = selectRowIndex(model.navigation());
                const row = table.data.rows()[rowIndex >= 0 ? rowIndex : rowIndex + 1];
                const commit = toggleSelection.execute(row);
                commit();
            },
        });
    }
}
