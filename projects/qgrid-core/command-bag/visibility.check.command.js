import { Command } from '../command/command';
import { VISIBILITY_CHECK_COMMAND_KEY } from './command.bag';
import { same } from '../utility/kit';

export class VisibilityCheckCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: VISIBILITY_CHECK_COMMAND_KEY,
            execute: () => {
                const { left, right } = model.scene().column.area;
                const { pinTop, pinBottom } = model.row();

                const { pin: oldPin } = model.visibility();
                const newPin = {
                    left: left.length > 0,
                    right: right.length > 0,
                    top: pinTop.length > 0,
                    bottom: pinBottom.length > 0
                };

                if (!same(oldPin, newPin)) {
                    model.visibility({
                        pin: newPin
                    }, {
                        source: 'visibility.check.command'
                    });
                }
            }
        });
    }
}
