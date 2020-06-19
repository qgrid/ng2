import { Command } from '../command/command';
import { copyToClipboard } from '../clipboard/clipboard';
import { getFactory as labelFactory } from '../services/label';
import { FOCUS_COMMAND_KEY, CLIPBOARD_COPY_COMMAND_KEY } from './command.bag';

export class ClipboardCopyCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette } = plugin;

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
                    if (copy.execute() !== true) {
                        const getLabel = labelFactory(cell.column);
                        copyToClipboard(getLabel(cell.row));

                        const focus = commandPalette.get(FOCUS_COMMAND_KEY);
                        focus.execute();
                    }
                }

                return true;
            }
        });
    }
}
