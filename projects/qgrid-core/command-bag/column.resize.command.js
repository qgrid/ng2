import { Command } from '../command/command';
import { COLUMN_RESIZE_COMMAND_KEY } from './command.bag';

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
