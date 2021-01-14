import { Command } from '../command/command';
import { GridError } from '../infrastructure/error';
import * as sortService from '../sort/sort.service';
import { SORT_TOGGLE_COMMAND_KEY, FOCUS_AFTER_RENDER_COMMAND_KEY } from './command.bag';

export class SortToggleCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        super({
            key: SORT_TOGGLE_COMMAND_KEY,
            canExecute: column => {
                return column && column.canSort !== false;
            },
            execute: column => {
                const { key } = column;
                const { by, mode } = model.sort();

                let sortBy = Array.from(by);
                if (mode === 'mixed') {
                    const { code, status } = model.keyboard();
                    const isSingleMode = code !== 'shift' || status !== 'down';
                    // if shift key is not pressed - reset sort for other columns and do sort like single mode
                    if (isSingleMode) {
                        const index = sortService.index(sortBy, key);
                        sortBy = index >= 0 ? sortBy.filter((_, i) => i === index) : [];
                    }
                }

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

                const focusAfterRender = commandPalette.get(FOCUS_AFTER_RENDER_COMMAND_KEY);
                focusAfterRender.execute();
                
                model.sort({
                    by: sortBy
                }, {
                    source: 'sort.toggle.command'
                });
            }
        });
}
}
