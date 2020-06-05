import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { isNumber } from '../utility/kit';
import { GRID_PREFIX } from '../definition';

export const ROW_DRAG_COMMAND_KEY = commandKey('row.drag.command');

export class RowDragCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

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
