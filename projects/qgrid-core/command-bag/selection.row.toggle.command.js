import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { isUndefined } from '../utility/kit';
import { SELECTION_TOGGLE_COMMAND_KEY } from './selection.toggle.command';

export const SELECTION_ROW_TOGGLE_COMMAND_KEY = commandKey('selection.row.toggle.command');

export class SelectionRowToggleCommand extends Command {
    constructor(plugin) {
        const { model, view, commandPalette } = plugin;
        const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);

        super({
            key: SELECTION_ROW_TOGGLE_COMMAND_KEY,
            canExecute: row => {
                const selectionLet = view.selection;
                if (!selectionLet.form.canSelect(row)) {
                    return false;
                }

                const e = {
                    items: isUndefined(row)
                        ? model.scene().rows
                        : [row],
                    source: 'custom',
                    kind: 'toggleRow'
                };

                if (!row) {
                    return model.selection().mode === 'multiple'
                        && model.selection().toggle.canExecute(e) === true;
                }

                return model.selection().toggle.canExecute(e) === true;
            },
            execute: (item) => {
                const commit = toggleSelection.execute(item);
                commit();
            },
        });
    }
}
