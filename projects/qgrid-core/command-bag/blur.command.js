import { Command } from '../command/command';
import { Fastdom } from '../services/fastdom';
import { GRID_PREFIX } from '../definition';
import { BLUR_COMMAND_KEY } from './command.bag';

export class BlurCommand extends Command {
    constructor(plugin) {
        const { table, model } = plugin;

        super({
            key: BLUR_COMMAND_KEY,
            canExecute: () => model.focus().isActive,
            execute: () => {
                Fastdom.mutate(() => table.view.removeClass(`${GRID_PREFIX}-active`));

                model.focus({
                    isActive: false,
                }, {
                    source: 'blur.command'
                });
            }
        });
    }
}
