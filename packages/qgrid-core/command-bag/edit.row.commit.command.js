import { Command } from '../command/command';
import { editRowShortcutFactory } from '../edit/edit.row.shortcut.factory';
import { editRowContextFactory } from '../edit/edit.row.context.factory';
import { RowEditor } from './edit.row.editor';
import { selectRow } from '../navigation/navigation.state.selector';

export const EDIT_ROW_COMMIT_COMMAND_KEY = commandKey('edit.row.commit.command');

export class EditRowCommitCommand extends Command {
    constructor(plugin) {
        const { model, view } = plugin;
        const getShortcut = editRowShortcutFactory(plugin);

        super({
            key: EDIT_ROW_COMMIT_COMMAND_KEY,
            priority: 1,
            stopPropagate: true,
            shortcut: getShortcut('commit'),
            canExecute: row => {
                row = row || selectRow(model.navigation());
                return row
                    && model.edit().mode === 'row'
                    && model.edit().status === 'edit'
                    && model.edit().commit.canExecute(editRowContextFactory(row));
            },
            execute: () => {
                const editLet = view.edit.row;

                editLet.editor.commit();
                editLet.editor = RowEditor.empty;

                model.edit({
                    status: 'view'
                }, {
                    source: 'edit.row.commit.command'
                });

                return true;
            }
        });
    }
}
