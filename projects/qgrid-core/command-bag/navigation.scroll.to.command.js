import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { Fastdom } from '../services/fastdom';

export const NAVIGATION_SCROLL_TO_COMMAND_KEY = commandKey('navigation.scroll.to.command');

export class NavigationScrollToCommand extends Command {
    constructor(plugin) {
        const { model, table } = plugin;

        super({
            key: NAVIGATION_SCROLL_TO_COMMAND_KEY,
            canExecute: ([row, column]) => {
                const td = table.body.cell(row, column).model();
                return td !== null
            },
            execute: ([row, column]) => {
                const { view } = table;
                const target = table.body.cell(row, column);

                Fastdom.measure(() => {
                    const tr = target.rect();
                    const vr = view.rect('body-mid');
                    const state = {};

                    if (view.canScrollTo(target, 'left')) {
                        if (vr.left > tr.left
                            || vr.left > tr.right
                            || vr.right < tr.left
                            || vr.right < tr.right) {

                            if (vr.width < tr.width || vr.left > tr.left || vr.left > tr.right) {
                                state.left = tr.left - vr.left + model.scroll().left;
                            }
                            else if (vr.left < tr.left || vr.right < tr.right) {
                                state.left = tr.right - vr.right + model.scroll().left;
                            }
                        }
                    }

                    if (view.canScrollTo(target, 'top')) {
                        if (vr.top > tr.top
                            || vr.top > tr.bottom
                            || vr.bottom < tr.top
                            || vr.bottom < tr.bottom) {

                            if (vr.height < tr.height || vr.top > tr.top || vr.top > tr.bottom) {
                                state.top = tr.top - vr.top + model.scroll().top;
                            }
                            else if (vr.top < tr.top || vr.bottom < tr.bottom) {
                                state.top = tr.bottom - vr.bottom + model.scroll().top;
                            }
                        }
                    }

                    if (Object.keys(state).length) {
                        model.scroll(state, {
                            behavior: 'core',
                            source: 'navigation.scroll.to.command'
                        });
                    }
                });
            },
        });
    }
}
