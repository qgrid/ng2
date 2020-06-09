import { Command } from '../command/command';
import { commandKey } from '../command/command.key';

export const PAGINATION_PREVIOUS_COMMAND_KEY = commandKey('pagination.previous.command');

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
                new FocusAfterRenderService(plugin);
                model.pagination({ 
                    current: model.pagination().current - 1 
                }, { 
                    source: 'pagination.previous.command' 
                });
            },
        });
    }
}
