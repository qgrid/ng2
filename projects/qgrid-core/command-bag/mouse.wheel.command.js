import { Command } from '../command/command';
import { MOUSE_WHEEL_COMMAND_KEY, SCROLL_COMMAND_KEY } from './command.bag';

const DEFAULT_DELTA_Y = 100;

export class MouseWheelCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        super({
            key: MOUSE_WHEEL_COMMAND_KEY,
            canExecute: () => {
                return model.keyboard().codes.indexOf('shift') < 0
                    && model.edit().status === 'view';
            },
            execute: (deltaY) => {
                const upper = 0;
                const scroll = commandPalette.get(SCROLL_COMMAND_KEY);

                Fastdom.measure(() => {
                    const lower = table.view.scrollHeight() - table.view.height();
                    const offset = DEFAULT_DELTA_Y * Math.sign(deltaY);
                    const top = Math.min(lower, Math.max(upper, model.scroll().top + offset));

                    const pos = [model.scroll().left, top];
                    prob(scroll, pos);
                });
            }
        });
    }
}
