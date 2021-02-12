import { Command, prob } from '../command/command';
import { selectRowIndex } from '../navigation/navigation.state.selector';
import { 
    SELECTION_ROW_TOGGLE_NEXT_COMMAND_KEY,
    NAVIGATION_GO_UP_COMMAND_KEY,
    SELECTION_TOGGLE_COMMAND_KEY
} from './command.bag';

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
                const goUp = commandPalette.get(NAVIGATION_GO_UP_COMMAND_KEY);

                const rowIndex = selectRowIndex(model.navigation());

                const row = table.data.rows()[rowIndex];
                const commit = toggleSelection.execute(row);
                commit();

                prob(goUp);
            },
        });
    }
}
