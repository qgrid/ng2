import { CellEditor } from '../edit/edit.cell.editor';
import { Command } from '../command/command';
import { commandKey } from '../command/command.key';
import { editCellContextFactory } from '../edit/edit.cell.context.factory';
import { editCellShortcutFactory } from '../edit/edit.cell.shortcut.factory';

export const EDIT_CELL_CANCEL_COMMAND_KEY = commandKey('edit.cell.cancel.command');

export class EditCellCancelCommand extends Command {
    constructor(plugin) {
        const { model, table, view } = plugin;
        const getShortcut = editCellShortcutFactory(plugin);

        super({
            key: EDIT_CELL_CANCEL_COMMAND_KEY,
            priority: 1,
            shortcut: getShortcut('cancel'),
            canExecute: cell => {
                const editLet = view.edit.cell;
                cell = cell || editLet.editor.td;

                const canEdit = cell
                    && cell.column.canEdit
                    && (cell.column.category === 'control' || model.edit().mode === 'cell')
                    && model.edit().status === 'edit';

                if (canEdit) {
                    const clientContext = editCellContextFactory(
                        cell,
                        editLet.value,
                        editLet.label,
                        editLet.tag
                    );

                    return model.edit().cancel.canExecute(clientContext);
                }

                return true;
            },
            execute: cell => {
                const editLet = view.edit.cell;
                cell = cell || editLet.editor.td;

                if (cell) {
                    const clientContext = editCellContextFactory(
                        cell,
                        editLet.value,
                        editLet.label,
                        editLet.tag
                    );

                    if (model.edit().cancel.execute(clientContext) !== true) {
                        editLet.editor.reset();
                        editLet.editor = CellEditor.empty;
                        editLet.requestClose = null;

                        editLet.mode(cell, 'view');
                        table.view.focus();
                    }

                    return true;
                }

                return false;
            }
        });
    }
}
