import { CellEditor } from './edit.cell.editor';
import { Command } from '../command/command';
import { Command } from '../command/command';
import { editCellContextFactory } from '../edit/edit.cell.context.factory';
import { editCellShortcutFactory } from '../edit/edit.cell.shortcut.factory';
import { Td } from '../dom/td';
import * as validationService from '../validation/validation.service';

export const EDIT_CELL_COMMIT_COMMAND_KEY = commandKey('edit.cell.commit.command');

export class EditCellCommitCommand extends Command {
    constructor(plugin) {
        const { model, table } = plugin;
        const getShortcut = editCellShortcutFactory(plugin);

        super({
            key: EDIT_CELL_COMMIT_COMMAND_KEY,
            priority: 1,
            stopPropagate: true,
            shortcut: getShortcut('commit'),
            canExecute: cell => {
                const editLet = edit.cell.view;
                cell = cell || editLet.editor.td;

                const canEdit = cell
                    && Td.equals(cell, editLet.editor.td)
                    && cell.column.canEdit
                    && (cell.column.category === 'control' || model.edit().mode === 'cell')
                    && model.edit().status === 'edit';

                if (canEdit) {
                    const { key } = cell.column;

                    const validator = validationService.createValidator(model.validation().rules, key);
                    const clientContext = editCellContextFactory(
                        cell,
                        editLet.value,
                        editLet.label,
                        editLet.tag
                    );

                    return validator.validate({ [key]: editLet.value }) !== false
                        && model.edit().commit.canExecute(clientContext) === true;
                }

                return false;
            },
            execute: cell => {
                const editLet = edit.cell.view;
                cell = cell || editLet.editor.td;

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

                        editLet.mode(cell, 'view');
                        table.view.focus();

                        return true;
                    }
                }

                return false;
            }

        });
    }
}
