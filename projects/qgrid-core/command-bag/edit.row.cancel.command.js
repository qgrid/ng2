import { Command } from '../command/command';
import { editRowShortcutFactory } from '../edit/edit.row.shortcut.factory';
import { editRowContextFactory } from '../edit/edit.row.context.factory';
import { RowEditor } from './edit.row.editor';
import { selectRow } from '../navigation/navigation.state.selector';

export const EDIT_ROW_CANCEL_COMMAND_KEY = commandKey('edit.row.cancel.command');

export class EditRowCancelCommand extends Command {
    constructor(plugin) {
        const { model, view } = plugin;
        const getShortcut = editRowShortcutFactory(plugin);

        super({
            key: EDIT_ROW_CANCEL_COMMAND_KEY,
            priority: 1,
            stopPropagate: true,
            shortcut: getShortcut('cancel'),
            canExecute: row => {
                row = row || selectRow(model.navigation());
                return row
                    && model.edit().mode === 'row'
                    && model.edit().status === 'edit'
                    && model.edit().cancel.canExecute(editRowContextFactory(row));
            },
            execute: () => {
                const editLet = view.edit.row;

                editLet.editor.reset();
                editLet.editor = RowEditor.empty;

                model.edit({
                    status: 'view'
                }, {
                    source: 'edit.row.cancel.command'
                });

                return true;
            }
        });
    }
}
