import { Command } from '../command/command';
import { commandKey } from '../command/command.key';

export const PAGINATION_NEXT_COMMAND_KEY = commandKey('pagination.next.command');

export class PaginationNextCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: PAGINATION_NEXT_COMMAND_KEY,
            shortcut: model.pagination().shortcut.next,
            canExecute: () => {
                return (model.pagination().current + 1) * model.pagination().size < model.pagination().count
            },
            execute: () => {
                new FocusAfterRenderService(plugin);
                model.pagination({
                    current: model.pagination().current + 1
                }, {
                    source: 'pagination.next.command'
                })
            },
        });
    }
}
