import { Command } from '../command/command';
import { 
    MOUSE_MOVE_COMMAND_KEY,
    SELECTION_RANGE_COMMAND_KEY,
    NAVIGATION_GO_TO_COMMAND_KEY,
    HIGHLIGHT_ROW_COMMAND_KEY,
    HIGHLIGHT_CELL_COMMAND_KEY
} from './command.bag';

export class MouseMoveCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        super({
            key: MOUSE_MOVE_COMMAND_KEY,
            canExecute: cell => {
                return !!cell;
            },
            execute: cell => {
                const highlightCell = commandPalette.get(HIGHLIGHT_CELL_COMMAND_KEY);
                const highlightRow = commandPalette.get(HIGHLIGHT_ROW_COMMAND_KEY);
                const selectRange = commandPalette.get(SELECTION_RANGE_COMMAND_KEY);
                const navigate = commandPalette.get(NAVIGATION_GO_TO_COMMAND_KEY);

                if (highlightCell.canExecute(cell) === true) {
                    highlightCell.execute(cell)
                }

                if (highlightRow.canExecute([cell.rowIndex, true]) === true) {
                    model
                        .highlight()
                        .rows
                        .forEach(rowIndex => highlightRow.execute([rowIndex, false]));

                    highlightRow.execute([cell.rowIndex, true]);
                }

                const range = [model.mouse().target, cell];
                if (selectRange.canExecute(range)) {
                    if (navigate.canExecute(range[1]) === true) {
                        navigate.execute(range[1]);
                    }

                    selectRange.execute(range);
                }
            }
        });
    }
}
