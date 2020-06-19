import { Command } from '../command/command';
import { KEY_UP_COMMAND_KEY, KEY_RELEASE_COMMAND_KEY } from './command.bag';

export class KeyUpCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        super({
            key: KEY_UP_COMMAND_KEY,
            canExecute: code => {
                const { codes } = model.keyboard();
                const index = codes.indexOf(code);
                return index >= 0;
            },
            execute: code => {
                const { codes } = model.keyboard();
                const index = codes.indexOf(code);
                if (index >= 0) {
                    const newCodes = Array.from(codes);
                    newCodes.splice(index, 1);

                    model.keyboard({
                        code,
                        codes: newCodes,
                        status: 'up'
                    }, {
                        source: 'key.up.command'
                    });

                    const { root } = model.shortcut();
                    root.keyUp(code);

                    if (!newCodes.length) {
                        const keyRelease = commandPalette.get(KEY_RELEASE_COMMAND_KEY);
                        if (keyRelease.canExecute() === true) {
                            keyRelease.execute();
                        }

                        root.reset();
                    }
                }
            }
        });
    }
}
