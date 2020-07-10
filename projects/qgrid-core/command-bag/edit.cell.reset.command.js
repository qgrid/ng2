import { Command } from '../command/command';
import { editCellContextFactory } from '../edit/edit.cell.context.factory';

export const EDIT_CELL_RESET_COMMAND_KEY = commandKey('edit.cell.reset.command');

export class EditCellResetCommand extends Command {
    constructor(plugin) {
        const { model, view } = plugin;

        super({
            key: EDIT_CELL_RESET_COMMAND_KEY,
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

                    return model.edit().reset.canExecute(clientContext) === true;
                }

                return false;
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

                    if (model.edit().reset.execute(clientContext) !== false) {
                        editLet.editor.reset();
                        return true;
                    }
                }

                return false;
            }
        });
    }
}
