import { Command } from '../command/command';
import { isUndefined } from '../utility/kit';
import { SELECTION_ROW_TOGGLE_COMMAND_KEY, SELECTION_TOGGLE_COMMAND_KEY } from './command.bag';

export class SelectionRowToggleCommand extends Command {
    constructor(plugin) {
        const { model, view, commandPalette } = plugin;

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
                const toggleSelection = commandPalette.get(SELECTION_TOGGLE_COMMAND_KEY);

                const commit = toggleSelection.execute(item);
                commit();
            },
        });
    }
}
