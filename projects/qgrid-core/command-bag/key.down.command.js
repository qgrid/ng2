import { Command } from '../command/command';
import { KEY_DOWN_COMMAND_KEY } from './command.bag';
import { uniq } from '../utility/kit';

export class KeyDownCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: KEY_DOWN_COMMAND_KEY,
            execute: code => {
                model.keyboard({
                    code,
                    codes: uniq(model.keyboard().codes.concat([code])),
                    status: 'down'
                }, {
                    source: 'key.down.command'
                });

                const { root } = model.shortcut();
                return root.keyDown(code);
            }
        });
    }
}
