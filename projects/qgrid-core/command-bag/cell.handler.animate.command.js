import { Command } from '../command/command';
import { Fastdom } from '../services/fastdom';
import { jobLine } from '../services/job.line';
import { CELL_HANDLER_ANIMATE_COMMAND_KEY } from './command.bag';

export class CellHandlerAnimateCommand extends Command {
    constructor(plugin) {
        const { table, model } = plugin;
        const job = jobLine(150);

        // When navigate first or when animation wasn't applied we need to omit
        // next navigation event to make handler to correct position.
        let doNotPassAnimation = false;

        super({
            key: CELL_HANDLER_ANIMATE_COMMAND_KEY,
            execute: ({ newCell, oldCell, handler }) => {
                oldCell = oldCell || {};
                newCell = newCell || {};
                const oldColumn = oldCell.column || {};
                const newColumn = newCell.column || {};

                const shouldAnimate =
                    !model.drag().isActive
                    && (oldColumn.key === newColumn.key || !(oldColumn.viewWidth || newColumn.viewWidth));

                if (!shouldAnimate) {
                    doNotPassAnimation = false;
                    return;
                }

                // It can be that the cell object was changed but indices are not.
                doNotPassAnimation =
                    (oldCell.rowIndex >= 0 && oldCell.columnIndex >= 0)
                    && (
                        newCell.rowIndex !== oldCell.rowIndex
                        || newCell.columnIndex !== oldCell.columnIndex
                    );

                const domCell = table.body.cell(newCell.rowIndex, newCell.columnIndex);
                if (doNotPassAnimation) {
                    domCell.addClass('q-grid-animate');
                    handler.classList.add('q-grid-active');

                    job(() => {
                        handler.classList.remove('q-grid-active');
                        domCell.removeClass('q-grid-animate');
                    }).catch(() => {
                        Fastdom.mutate(() => {
                            domCell.removeClass('q-grid-animate');
                        });
                    });
                }

                Fastdom.measure(() => {
                    const target = domCell.element;
                    const scrollState = model.scroll();
                    const headHeight = table.view.height('head-mid');

                    const top = Math.max(headHeight, (target.offsetTop - scrollState.top));
                    const left = target.offsetLeft - (newColumn.pin === 'mid' ? scrollState.left : 0);
                    const width = target.offsetWidth;
                    const height = target.offsetHeight;

                    Fastdom.mutate(() => {
                        handler.style.top = top + 'px';
                        handler.style.left = left + 'px';
                        handler.style.width = width + 'px';
                        handler.style.height = height + 'px';
                    });
                });

                doNotPassAnimation = true;
            }
        });
    }
}
