import { Command } from '../command/command';
import { Fastdom } from '../services/fastdom';
import { isUndefined } from '../utility/kit';
import { SCROLL_TO_COMMAND_KEY, SCROLL_COMMAND_KEY } from './command.bag';

export class ScrollToCommand extends Command {
    constructor(plugin) {
        const { model, table, commandPalette } = plugin;

        super({
            key: SCROLL_TO_COMMAND_KEY,
            canExecute: ([rowIndex, columnIndex]) => {
                const td = table.body.cell(rowIndex, columnIndex).model();
                return td !== null
            },
            execute: ([rowIndex, columnIndex]) => {
                const { view } = table;
                const target = table.body.cell(rowIndex, columnIndex);

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
                                state.left = Math.floor(tr.left - vr.left + model.scroll().left);
                            }
                            else if (vr.left < tr.left || vr.right < tr.right) {
                                state.left = Math.ceil(tr.right - vr.right + model.scroll().left);
                            }
                        }
                    }

                    if (view.canScrollTo(target, 'top')) {
                        if (vr.top > tr.top
                            || vr.top > tr.bottom
                            || vr.bottom < tr.top
                            || vr.bottom < tr.bottom) {

                            if (vr.height < tr.height || vr.top > tr.top || vr.top > tr.bottom) {
                                state.top = Math.floor(tr.top - vr.top + model.scroll().top);
                            }
                            else if (vr.top < tr.top || vr.bottom < tr.bottom) {
                                state.top = Math.ceil(tr.bottom - vr.bottom + model.scroll().top);
                            }
                        }
                    }

                    if (Object.keys(state).length) {
                        const scroll = commandPalette.get(SCROLL_COMMAND_KEY);
                        const left = isUndefined(state.left) ? model.scroll().left : state.left;
                        const top = isUndefined(state.top) ? model.scroll().top : state.top;
                        const pos = [left, top];

                        if (scroll.canExecute(pos) === true) {
                            scroll.execute(pos);
                        }
                    }
                });
            },
        });
    }
}
