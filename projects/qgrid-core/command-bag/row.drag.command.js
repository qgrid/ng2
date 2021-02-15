import { Command } from '../command/command';
import { isNumber } from '../utility/kit';
import { GRID_PREFIX } from '../definition';
import { ROW_DRAG_COMMAND_KEY } from './command.bag';

export class RowDragCommand extends Command {
    constructor(plugin) {
        const { model, table } = plugin;

        super({
            key: ROW_DRAG_COMMAND_KEY,
            canExecute: e => {
                if (isNumber(e.data)) {
                    const index = e.data;
                    return index >= 0 && model.scene().rows.length > index;
                }

                return false;
            },
            execute: e => {
                const index = e.data;
                const row = table.body.row(index);
                row.addClass(`${GRID_PREFIX}-drag`);

                const tr = row.model();
                if (tr) {
                    return tr.element;
                }

                return null;
            },

        });
    }
}
