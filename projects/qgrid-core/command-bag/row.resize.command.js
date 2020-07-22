import { Command } from '../command/command';
import { ROW_RESIZE_COMMAND_KEY } from './command.bag';
import { clone } from '../utility/kit';

export class RowResizeCommand extends Command {
    constructor(plugin) {
        const { model, table } = plugin;

        super({
            key: ROW_RESIZE_COMMAND_KEY,
            canExecute: () => {
                return model.row().canResize;
            },
            execute: e => {
                const { data: row, width, height, kind } = e;
                switch (kind) {
                    case 'resize': {
                        const sizeMap = clone(model.layout().rows);

                        sizeMap.set(row, {
                            width,
                            height
                        });

                        model.layout({
                            columns: sizeMap
                        }, {
                            source: 'row.resize.command'
                        });

                        break;
                    }
                }
            }
        });
    }
}
