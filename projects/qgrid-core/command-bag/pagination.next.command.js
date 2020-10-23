import { Command } from '../command/command';
import { PAGINATION_NEXT_COMMAND_KEY, FOCUS_AFTER_RENDER_COMMAND_KEY } from './command.bag';

export class PaginationNextCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

        super({
            key: PAGINATION_NEXT_COMMAND_KEY,
            shortcut: model.pagination().shortcut.next,
            canExecute: () => {
                return (model.pagination().current + 1) * model.pagination().size < model.pagination().count
            },
            execute: () => {
                const focusAfterRender = commandPalette.get(FOCUS_AFTER_RENDER_COMMAND_KEY);
                focusAfterRender.execute();

                model.pagination({
                    current: model.pagination().current + 1
                }, {
                    source: 'pagination.next.command'
                })
            },
        });
    }
}