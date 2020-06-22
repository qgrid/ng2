import { Command } from '../command/command';
import { editCellContextFactory } from '../edit/edit.cell.context.factory';

export const EDIT_CELL_CLEAR_COMMAND_KEY = commandKey('edit.cell.clear.command');

export class EditCellClearCommand extends Command {
    constructor(plugin) {
        const { model, view } = plugin;

        super({
            key: EDIT_CELL_CLEAR_COMMAND_KEY,
            priority: 1,
            stopPropagate: true,
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

                    return model.edit().clear.canExecute(clientContext);
                }

                return false;
            },
            execute: (cell, e) => {
                const editLet = view.edit.cell;
                cell = cell || editLet.editor.td;

                if (cell) {
                    const clientContext = editCellContextFactory(
                        cell,
                        editLet.value,
                        editLet.label,
                        editLet.tag
                    );

                    if (model.edit().clear.execute(clientContext) !== false) {
                        editLet.editor.clear();
                        return true;
                    }
                }

                return false;
            }
        });
    }
}
