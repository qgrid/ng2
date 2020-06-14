import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { guid } from '../services/guid';

export const GRID_BUSY_COMMAND_KEY = commandKey('grid.busy.command');

export class GridBusyCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: GRID_BUSY_COMMAND_KEY,
            execute: () => {
                const id = guid();
                const queue = model.progress().queue.concat([id]);
                model.progress({
                    queue
                }, {
                    source: 'grid.busy.command'
                });

                return () => {
                    const queue = Array.from(model.progress().queue);
                    const index = queue.indexOf(id);
                    if (index >= 0) {
                        queue.splice(index, 1);
                        model.progress({
                            queue
                        }, {
                            source: 'grid.busy.command'
                        });
                    }
                };
            }
        });
    }
}
