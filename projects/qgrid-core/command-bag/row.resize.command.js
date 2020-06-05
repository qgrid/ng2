import { Command } from '../command/command';
import { commandKey } from '../command/command.key';

export const ROW_RESIZE_COMMAND_KEY = commandKey('row.resize.command');

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
