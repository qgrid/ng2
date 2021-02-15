import { Command } from '../command/command';
import { LEFT_BUTTON, stringify, NO_BUTTON } from '../mouse/mouse.code';
import { MOUSE_UP_COMMAND_KEY } from './command.bag';

export class MouseUpCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: MOUSE_UP_COMMAND_KEY,
            execute: ([cell, code]) => {
                model.mouse({
                    code: stringify(code),
                    status: 'up',
                    target: cell,
                }, {
                    source: 'mouse.up.command'
                });

                if (code === LEFT_BUTTON) {
                    if (model.edit().status === 'startBatch') {
                        model.edit({
                            status: 'endBatch'
                        }, {
                            source: 'mouse.up.command'
                        });
                    }
                }

                model.mouse({
                    code: stringify(NO_BUTTON),
                    status: 'release',
                    target: null,
                    timestamp: Date.now(),
                }, {
                    source: 'mouse.up.command'
                });
            }
        });
    }
}
