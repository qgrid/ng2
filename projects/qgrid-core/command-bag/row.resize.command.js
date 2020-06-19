import { Command } from '../command/command';
import { ROW_RESIZE_COMMAND_KEY } from './command.bag';

export class RowResizeCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: ROW_RESIZE_COMMAND_KEY,
            canExecute: () => {
                return model.row().canResize;
            }
        });
    }
}
