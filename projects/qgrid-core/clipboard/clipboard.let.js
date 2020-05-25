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
                return status === 'view';
            },
            execute: () => {
                const { cell } = model.navigation();
                if (cell) {
                    const getLabel = labelFactory(cell.column);
                    copyToClipboard(getLabel(cell.row));
                    table.view.focus();
                }

                return true;
            }
        });

        shortcut.register([this.copy]);
    }
}
