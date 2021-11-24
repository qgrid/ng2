import { Command } from '../command/command';
import { editRowShortcutFactory } from '../edit/edit.row.shortcut.factory';
import { editRowContextFactory } from '../edit/edit.row.context.factory';
import { selectRow } from '../navigation/navigation.state.selector';

export const EDIT_ROW_RESET_COMMAND_KEY = commandKey('edit.row.reset.command');

export class EditRowResetCommand extends Command {
    constructor(plugin) {
        const { model, view } = plugin;
        const getShortcut = editRowShortcutFactory(plugin);

        super({
            key: EDIT_ROW_CANCEL_COMMAND_KEY,
            priority: 1,
            stopPropagate: true,
            shortcut: getShortcut('reset'),
            canExecute: row => {
                row = row || selectRow(model.navigation());
                return row
                    && model.edit().mode === 'row'
                    && model.edit().status === 'edit'
                    && model.edit().reset.canExecute(editRowContextFactory(row));
            },
            execute: (row, e) => {
                const editLet = view.edit.row;

                if (row) {
                    if (model.edit().reset.execute(editRowContextFactory(row)) !== false) {
                        editLet.editor.reset();
                        return true;
                    }
                }

                return false;
            }
        });
    }
}
