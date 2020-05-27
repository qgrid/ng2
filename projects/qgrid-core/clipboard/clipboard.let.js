import { Command } from '../command/command';
import { copyToClipboard } from './clipboard';
import { getFactory as labelFactory } from '../services/label';

export class ClipboardLet {
    constructor(plugin, shortcut) {
        const { model, table } = plugin;

        this.copy = new Command({
            priority: 1,
            source: 'clipboard.let',
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

        shortcut.register([this.copy]);
    }
}
