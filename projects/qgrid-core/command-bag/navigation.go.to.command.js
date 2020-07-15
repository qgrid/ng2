import { Command } from '../command/command';
import { Td } from '../dom/td';
import { NAVIGATION_GO_TO_COMMAND_KEY } from './command.bag';

export class NavigationGoToCommand extends Command {
    constructor(plugin, nav, site) {
        const { model } = plugin;

        const findCell = (rowIndex, columnIndex) => {
            let cell = nav.cell(rowIndex, columnIndex);
            if (!cell) {
                // TODO: make it better, right it just a huck for row-details,
                // need to support rowspan and colspan
                cell = nav.cell(rowIndex, site.firstColumn);
            }

            return cell;
        };

        super({
            key: NAVIGATION_GO_TO_COMMAND_KEY,
            canExecute: ({ rowIndex, columnIndex }) => {
                const newCell = findCell(rowIndex, columnIndex);
                if (newCell && !newCell.column.canFocus) {
                    return false;
                }

                return !Td.equals(model.navigation().cell, newCell);
            },
            execute: ({ rowIndex, columnIndex }) => {
                const cell = findCell(rowIndex, columnIndex);

                model.navigation({
                    cell
                }, {
                    source: 'navigation.go.to.command',
                    behavior: 'core'
                });

                return true;
            }
        });
    }
}
