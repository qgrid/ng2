import { Command } from '../command/command';
import { editRowShortcutFactory } from '../edit/edit.row.shortcut.factory';
import { editRowContextFactory } from '../edit/edit.row.context.factory';
import { RowEditor } from './edit.row.editor';
import { selectRow } from '../navigation/navigation.state.selector';

export const EDIT_ROW_ENTER_COMMAND_KEY = commandKey('edit.row.enter.command');

export class EditRowEnterCommand extends Command {
    constructor(plugin) {
        const { model, view } = plugin;
        const getShortcut = editRowShortcutFactory(plugin);

        super({
            key: EDIT_ROW_ENTER_COMMAND_KEY,
            priority: 1,
            stopPropagate: true,
            shortcut: getShortcut('enter'),
            canExecute: row => {
                row = row || selectRow(model.navigation());
                return row
                    && model.edit().mode === 'row'
                    && model.edit().status === 'view'
                    && model.edit().enter.canExecute(editRowContextFactory(row));
            },
            execute: row => {
                row = row || selectRow(model.navigation());
                if (row) {
                    if (model.edit().enter.canExecute(editRowContextFactory(row)) !== false) {
                        const editLet = view.edit.row;
                        const columns = model.columnList().line;

                        editLet.editor = new RowEditor(row, columns);
                        model.edit({
                            status: 'edit'
                        }, {
                            source: 'edit.row.enter.command'
                        });

                        return true;
                    }
                }

                return false;
            }
        });
    }
}
