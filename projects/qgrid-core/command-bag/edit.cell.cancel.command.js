import { CellEditor } from '../edit/edit.cell.editor';
import { Command } from '../command/command';
import { editCellContextFactory } from '../edit/edit.cell.context.factory';
import { editCellShortcutFactory } from '../edit/edit.cell.shortcut.factory';
import { EDIT_CELL_CANCEL_COMMAND_KEY, FOCUS_COMMAND_KEY } from './command.bag';

export class EditCellCancelCommand extends Command {
    constructor(plugin) {
        const { model, commandPalette, view } = plugin;
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

                        const focus = commandPalette.get(FOCUS_COMMAND_KEY);
                        focus.execute();
                    }

                    return true;
                }

                return false;
            }
        });
    }
}
