import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { Command } from '../command/command';


export const COLUMN_RESIZE_COMMAND_KEY = commandKey('column.resize.command');

export class ColumnResizeCommand extends Command {
    constructor(plugin) {
        const { table } = plugin;

        super({
            key: COLUMN_RESIZE_COMMAND_KEY,
            canExecute: e => {
				const key = e.data;
				const columnMap = table.data.columnMap();
				return columnMap.hasOwnProperty(key) && columnMap[key].canResize !== false;
			}
        });
    }
}
