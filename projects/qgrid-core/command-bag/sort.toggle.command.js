import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { GridError } from '../infrastructure/error';
import { Command } from '../command/command';
import * as columnService from '../column/column.service';
import * as sortService from '../sort/sort.service';


export const SORT_TOGGLE_COMMAND_KEY = commandKey('sort.toggle.command');

export class SortToggleCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: SORT_TOGGLE_COMMAND_KEY,
            canExecute: column => {
                if (column) {
                    const { key } = column;
                    const columnMap = columnService.map(model.columnList().line);
                    return columnMap.hasOwnProperty(key) && columnMap[key].canSort !== false;
                }

                return false;
            },
            execute: column => {
                const { key } = column;
                const { by, mode } = model.sort();

                const sortBy = Array.from(by);
                const index = sortService.index(sortBy, key);
                if (index >= 0) {
                    const dir = sortService.direction(sortBy[index]);
                    switch (dir) {
                        case 'desc': {
                            sortBy.splice(index, 1);
                            break;
                        }
                        case 'asc': {
                            const entry = { [key]: 'desc' };
                            sortBy[index] = entry;
                            break;
                        }
                        default:
                            throw GridError(
                                'sort.toggle.command',
                                `Invalid sort direction ${dir}`
                            );
                    }
                }
                else {
                    if (mode === 'single') {
                        sortBy.length = 0;
                    }

                    const entry = { [key]: 'asc' };
                    sortBy.push(entry);

                    const order = sortService.orderFactory(model);
                    order(sortBy);
                }

                model.sort({
                    by: sortBy
                }, {
                    source: 'sort.toggle.command'
                });
            }
        });
    }
}
