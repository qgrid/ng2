import { Command, prob } from '../command/command';
import { selectRowIndex, selectColumnIndex } from '../navigation/navigation.state.selector';
import { 
    SELECTION_ROW_TOGGLE_PREVIOUS_COMMAND_KEY,
    NAVIGATION_GO_DOWN_COMMAND_KEY,
    SELECTION_TOGGLE_COMMAND_KEY
 } from './command.bag';

export class SelectionRowTogglePreviousCommand extends Command {
    constructor(plugin) {
        const { model, table, commandPalette } = plugin;

        super({
            key: SELECTION_ROW_TOGGLE_PREVIOUS_COMMAND_KEY,
            shortcut: model.selection().shortcut.togglePreviousRow,
            canExecute: () => {
                return model.selection().unit === 'row'
                    && selectRowIndex(model.navigation()) > 0;
            },
            execute: () => {
                const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);
                const goDown = commandPalette.get(NAVIGATION_GO_DOWN_COMMAND_KEY);

                const rowIndex = selectRowIndex(model.navigation());
                const columnIndex = selectColumnIndex(model.navigation());

                const row = table.data.rows()[rowIndex];
                const commit = toggleSelection.execute(row);
                commit();

                prob(goDown);
            },
        });
    }
}
