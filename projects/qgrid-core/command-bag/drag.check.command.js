import { Command } from '../command/command';
import { DRAG_CHECK_COMMAND_KEY } from './command.bag';
import { GRID_PREFIX } from '../definition';

export class DragCheckCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: DRAG_CHECK_COMMAND_KEY,
            execute: host => {
                if (model.drag().isActive) {
                    host.classList.add(`${GRID_PREFIX}-drag`);
                }
                else {
                    host.classList.remove(`${GRID_PREFIX}-drag`);
                }
            }
        });
    }
}
