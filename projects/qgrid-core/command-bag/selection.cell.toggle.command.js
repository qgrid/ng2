import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { SELECTION_TOGGLE_COMMAND_KEY } from './selection.toggle.command';

export const SELECTION_CELL_TOGGLE_COMMAND_KEY = commandKey('selection.cell.toggle.command');

export class SelectionCellToggleCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;
        const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);

        super({
            key: SELECTION_CELL_TOGGLE_COMMAND_KEY,
            canExecute: cell => {
                const { mode, unit } = model.selection();
                return cell && mode !== 'range' && (unit === 'cell' || unit === 'mix');
            },
            execute: cell => {
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
