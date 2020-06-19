import { Command } from '../command/command';
import { guid } from '../services/guid';
import { BUSY_COMMAND_KEY } from './command.bag';

export class BusyCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: BUSY_COMMAND_KEY,
            execute: () => {
                const id = guid();
                const queue = model.progress().queue.concat([id]);
                model.progress({
                    queue
                }, {
                    source: 'busy.command'
                });

                return () => {
                    const queue = Array.from(model.progress().queue);
                    const index = queue.indexOf(id);
                    if (index >= 0) {
                        queue.splice(index, 1);
                        model.progress({
                            queue
                        }, {
                            source: 'busy.command'
                        });
                    }
                };
            }
        });
    }
}
