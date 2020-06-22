import { CellEditor } from './edit.cell.editor';
import { Command } from '../command/command';
import { editCellContextFactory } from '../edit/edit.cell.context.factory';
import * as validationService from '../validation/validation.service';

export const EDIT_CELL_PUSH_COMMAND_KEY = commandKey('edit.cell.push.command');

export class EditCellPushCommand extends Command {
    constructor(plugin) {
        const { model, view } = plugin;

        super({
            key: EDIT_CELL_PUSH_COMMAND_KEY,
            priority: 1,
            stopPropagate: true,
            canExecute: cell => {
                const editLet = view.edit.cell;

                cell = cell || editLet.editor.td;
                const canEdit = cell && cell.column.canEdit;
                if (canEdit) {
                    const clientContext = editCellContextFactory(
                        cell,
                        editLet.value,
                        editLet.label,
                        editLet.tag
                    );

                    const { key } = cell.column;
                    const validator = validationService.createValidator(model.validation().rules, key);
                    return validator.validate({ [key]: this.value })
                        && model.edit().commit.canExecute(clientContext) === true;
                }

                return false;
            },
            execute: (cell, e) => {
                cell = cell || this.editor.td;
                if (cell) {
                    const clientContext = editCellContextFactory(
                        cell,
                        editLet.value,
                        editLet.label,
                        editLet.tag
                    );

                    if (model.edit().commit.execute(clientContext) !== false) {
                        editLet.editor.commit();
                        editLet.editor = CellEditor.empty;
                        editLet.requestClose = null;

                        return true;
                    }
                }

                return false;
            }
        });
    }
}
