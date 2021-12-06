import { Command } from '../command/command';
import { copyToClipboard } from '../clipboard/clipboard';
import { getFactory as labelFactory } from '../services/label';
import { commandKey } from '../command/command.key';

export const CLIPBOARD_COPY_COMMAND_KEY = commandKey('clipboard.copy.command');

export class ClipboardCopyCommand extends Command {
    constructor(plugin) {
        const { model } = plugin;

        super({
            key: CLIPBOARD_COPY_COMMAND_KEY,
            priority: 1,
            shortcut: 'ctrl+c',
            canExecute: () => {
                const { status } = model.edit();
                const { copy } = model.clipboard();
                return status === 'view' && copy.canExecute();
            },
            execute: () => {
                const { cell } = model.navigation();
                if (cell) {
                    const { copy } = model.clipboard();
                    if (copy.execute() !== false) {
                        const getLabel = labelFactory(cell.column);
                        copyToClipboard(getLabel(cell.row));
                        table.view.focus();
                    }
                }

                return true;
            }
        });
    }
}
