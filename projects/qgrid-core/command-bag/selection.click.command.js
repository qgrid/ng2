import { Command } from '../command/command';
import { 
    SELECTION_CLICK_COMMAND_KEY,
    SELECTION_COLUMN_TOGGLE_COMMAND_KEY,
    SELECTION_CELL_TOGGLE_COMMAND_KEY,
    SELECTION_ROW_TOGGLE_COMMAND_KEY
} from './command.bag';

export class SelectionClickCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        super({
            key: SELECTION_CLICK_COMMAND_KEY,
            canExecute: (cell) => {
                const { area, mode } = model.selection();
                if (cell && (cell.column.type === 'select' || area === 'body' || mode === 'range')) {
                    return true;
                }

                return false;
            },
            execute: (cell) => {
                switch (model.selection().unit) {
                    case 'row': {
                        const toggleRow = commandPalette.get(SELECTION_ROW_TOGGLE_COMMAND_KEY);
                        if (cell.column.type === 'select' && cell.column.editorOptions.trigger === 'focus') {
                            const currentRowIndex = selectRowIndex(model.navigation());
                            if (currentRowIndex !== cell.rowIndex) {
                                if (toggleRow.canExecute(cell.row) === true) {
                                    toggleRow.execute(cell.row);
                                }
                            }
                        } else if (!model.edit().mode && cell.column.category !== 'control') {
                            if (toggleRow.canExecute(cell.row)) {
                                toggleRow.execute(cell.row);
                            }
                        }

                        break;
                    }
                    case 'column': {
                        const toggleColumn = commandPalette.get(SELECTION_COLUMN_TOGGLE_COMMAND_KEY);
                        if (!model.edit().mode) {
                            if (toggleColumn.canExecute(cell.column) === true) {
                                toggleColumn.execute(cell.column);
                            }
                        }

                        break;
                    }
                    case 'mix': {
                        const toggleCell = commandPalette.get(SELECTION_CELL_TOGGLE_COMMAND_KEY);
                        if (cell.column.type === 'row-indicator') {
                            if (toggleCell.canExecute(cell) === true) {
                                toggleCell.execute(cell);
                            }
                        }

                        break;
                    }
                }
            }
        });
    }
}
