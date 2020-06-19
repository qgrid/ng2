import { Command } from '../command/command';
import { KEY_RELEASE_COMMAND_KEY } from './command.bag';

export class KeyReleaseCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: KEY_RELEASE_COMMAND_KEY,
            execute: () => {
                model.keyboard({
                    code: null,
                    codes: [],
                    status: 'release'
                }, {
                    source: 'key.release.command'
                });

                const { root } = model.shortcut();
                root.reset();
            }
        });
    }
}
