import { Command } from '../command/command';
import { 
    EDIT_CELL_EXIT_COMMAND_KEY, 
    EDIT_CELL_COMMIT_COMMAND_KEY, 
    EDIT_CELL_CANCEL_COMMAND_KEY 
} from './command.bag';

export class EditCellExitCommand extends Command {
    constructor(plugin) {
        const { view, commandPalette } = plugin;

        super({
            key: EDIT_CELL_EXIT_COMMAND_KEY,
            priority: 1,
            execute: cell => {
                const editLet = view.edit.cell;
                cell = cell || cell.editor.td;
                if (cell) {
                    const commit = commandPalette.get(EDIT_CELL_COMMIT_COMMAND_KEY);
                    const cancel = commandPalette.get(EDIT_CELL_CANCEL_COMMAND_KEY);

                    if (commit.canExecute(cell) === true) {
                        const originValue = cell.value;
                        const editValue = editLet.value;
                        if (originValue !== editValue) {
                            commit.execute(cell);
                            return true;
                        }
                    }

                    if (cancel.canExecute(cell) === true) {
                        cancel.execute(cell);
                        return true;
                    }
                }

                return true;
            }
        });
    }
}
