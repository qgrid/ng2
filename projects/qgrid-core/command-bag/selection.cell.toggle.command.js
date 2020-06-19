import { Command } from '../command/command';
import { SELECTION_CELL_TOGGLE_COMMAND_KEY, SELECTION_TOGGLE_COMMAND_KEY } from './command.bag';

export class SelectionCellToggleCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        super({
            key: SELECTION_CELL_TOGGLE_COMMAND_KEY,
            canExecute: cell => {
                const { mode, unit } = model.selection();
                return cell && mode !== 'range' && (unit === 'cell' || unit === 'mix');
            },
            execute: cell => {
                const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);

                const { unit } = model.selection();
                switch (unit) {
                    case 'cell': {
                        const commit = toggleSelection.execute(cell);
                        commit();
                        break;
                    }
                    case 'mix': {
                        if (cell.column.type === 'row-indicator') {
                            const commit = toggleSelection.execute({ item: cell.row, unit: 'row' });
                            commit();
                            break;
                        }
                        else {
                            const commit = toggleSelection.execute({ item: cell, unit: 'cell' });
                            commit();
                            break;
                        }
                    }
                }
            }
        });
    }
}
