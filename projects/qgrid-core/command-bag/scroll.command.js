import { Command } from '../command/command';
import { SCROLL_COMMAND_KEY } from './command.bag';
import { GRID_PREFIX } from '../definition';
import { jobLine } from '../services/job.line';

const VERTICAL_SCROLL_CLASS = `${GRID_PREFIX}-scroll-vertical`;
const HORIZONTAL_SCROLL_CLASS = `${GRID_PREFIX}-scroll-horizontal`;

export class ScrollCommand extends Command {
    constructor(plugin) {
        const { model, table } = plugin;
        const classJob = jobLine(100);

        super({
            key: SCROLL_COMMAND_KEY,
            canExecute: ([scrollLeft, scrollTop]) => {
                const currentState = model.scroll();
                return currentState.left !== scrollLeft || currentState.top !== scrollTop;
            },
            execute: ([scrollLeft, scrollTop]) => {
                const currentState = model.scroll();
                const newState = {};

                if (currentState.top !== scrollTop) {
                    table.view.addClass(VERTICAL_SCROLL_CLASS);
                    newState.top = scrollTop;
                    table.view.scrollTop(scrollTop);
                }

                if (currentState.left !== scrollLeft) {
                    table.view.addClass(HORIZONTAL_SCROLL_CLASS);
                    newState.left = scrollLeft;
                    table.view.scrollLeft(scrollLeft);
                }

                if (Object.keys(newState).length) {
                    model.scroll(newState, {
                        source: 'scroll.command'
                    });
                }

                classJob(() => {
                    table.view.removeClass(VERTICAL_SCROLL_CLASS);
                    table.view.removeClass(HORIZONTAL_SCROLL_CLASS);
                });
            }
        });
    }
}
