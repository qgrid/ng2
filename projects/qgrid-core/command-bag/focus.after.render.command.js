import { Command, prob } from '../command/command';
import { filter, takeOnce } from '../rx/rx.operators';
import { FOCUS_AFTER_RENDER_COMMAND_KEY, FOCUS_COMMAND_KEY } from './command.bag';

export class FocusAfterRenderCommand extends Command {
    constructor(plugin) {
        const { model, observe, commandPalette } = plugin;

        super({
            key: FOCUS_AFTER_RENDER_COMMAND_KEY,
            execute: pos => {
                observe(model.sceneChanged)
                    .pipe(
                        filter(e => e.hasChanges('status') && e.state.status === 'stop'),
                        takeOnce()
                    )
                    .subscribe(() => {
                        const focus = commandPalette.get(FOCUS_COMMAND_KEY);
                        prob(focus, pos);
                    });
            }
        });
    }
}
