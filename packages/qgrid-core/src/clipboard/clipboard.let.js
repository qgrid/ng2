import { Command } from '../command/command';
import { getLabelFactory } from '../services/label';
import { copyToClipboard } from './clipboard';

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
            const getLabel = getLabelFactory(cell.column);
            copyToClipboard(getLabel(cell.row));
            table.view.focus();
          }
        }

        return true;
      },
    });

    shortcut.register([this.copy]);
  }
}
