import { Command } from '../command/command';
import { COLUMN_RESIZE_COMMAND_KEY } from './command.bag';
import { clone } from '../utility/kit';

export class ColumnResizeCommand extends Command {
    constructor(plugin) {
        const { model, table } = plugin;

        super({
            key: COLUMN_RESIZE_COMMAND_KEY,
            canExecute: e => {
                const key = e.data;
                const columnMap = table.data.columnMap();
                return columnMap.hasOwnProperty(key) && columnMap[key].canResize !== false;
            },
            execute: e => {
                const { data: key, width, height, kind } = e;
                switch (kind) {
                    case 'resize': {
                        const sizeMap = clone(model.layout().columns);

                        sizeMap.set(key, {
                            width,
                            height
                        });

                        model.layout({
                            columns: sizeMap
                        }, {
                            source: 'column.resize.command'
                        });

                        break;
                    }
                }
            }
        });
    }
}
