import { Command } from '../command/command';
import { Fastdom } from '../services/fastdom';
import { CELL_HANDLER_INVALIDATE_COMMAND_KEY } from './command.bag';

export class CellHandlerInvalidateCommand extends Command {
    constructor(plugin) {
        const { table, model } = plugin;

        super({
            key: CELL_HANDLER_INVALIDATE_COMMAND_KEY,
            execute: ({ cell, handler }) => {
                const domCell = table.body.cell(cell.rowIndex, cell.columnIndex);

                Fastdom.measure(() => {
                    const target = domCell.element;
                    const scrollState = model.scroll();
                    const headHeight = table.view.height('head-mid');

                    const top = Math.max(headHeight, (target.offsetTop - scrollState.top));
                    const left = target.offsetLeft - (cell.column.pin === 'mid' ? scrollState.left : 0);
                    const width = target.offsetWidth;
                    const height = target.offsetHeight;

                    Fastdom.mutate(() => {
                        handler.style.top = top + 'px';
                        handler.style.left = left + 'px';
                        handler.style.width = width + 'px';
                        handler.style.height = height + 'px';
                    });
                });
            }
        });
    }
}
