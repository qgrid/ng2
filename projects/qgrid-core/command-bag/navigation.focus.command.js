import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { Td } from '../dom/td';

export const NAVIGATION_FOCUS_COMMAND_KEY = commandKey('navigation.focus.command');

export class NavigationFocusCommand extends Command {
    constructor(plugin) {
        const { model, table } = plugin;

        super({
            key: NAVIGATION_PAGE_UP_COMMAND_KEY,
            canExecute: cell => {
                const { cell: currentCell } = model.navigation();
                if (cell && cell.column.canFocus && !Td.equals(cell, currentCell)) {
                    return true;
                }

                return false;
            },
            execute: ({ rowIndex, columnIndex, behavior }) => {
                const td = table.body.cell(rowIndex, columnIndex).model();
                if (td) {
                    const { row, column } = td;
                    model.navigation({
                        cell: {
                            rowIndex,
                            columnIndex,
                            row,
                            column
                        }
                    }, {
                        source: 'navigation.focus.command',
                        behavior
                    });
                } else {
                    model.navigation({
                        cell: null
                    }, {
                        source: 'navigation.focus.command',
                        behavior
                    });
                }
            },
        });
    }
}
