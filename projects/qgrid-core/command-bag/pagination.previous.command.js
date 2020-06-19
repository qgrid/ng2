import { Command } from '../command/command';
import { PAGINATION_PREVIOUS_COMMAND_KEY, FOCUS_AFTER_RENDER_COMMAND_KEY } from './command.bag';

export class PaginationPreviousCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: PAGINATION_PREVIOUS_COMMAND_KEY,
            shortcut: model.pagination().shortcut.prev,
            canExecute: () => {
                return model.pagination().current > 0;
            },
            execute: () => {
                const focusAfterRender = commandPalette.get(FOCUS_AFTER_RENDER_COMMAND_KEY);
                focusAfterRender.execute();

                model.pagination({ 
                    current: model.pagination().current - 1 
                }, { 
                    source: 'pagination.previous.command' 
                });
            },
        });
    }
}
