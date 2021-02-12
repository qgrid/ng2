import { Command } from '../command/command';
import { editCellContextFactory } from '../edit/edit.cell.context.factory';
import { editCellShortcutFactory } from '../edit/edit.cell.shortcut.factory';
import { Keyboard } from '../keyboard/keyboard';
import { CellEditor } from '../edit/edit.cell.editor';
import { parseFactory } from '../services/convert';
import { EDIT_CELL_ENTER_COMMAND_KEY } from './command.bag';

export class EditCellEnterCommand extends Command {
    constructor(plugin) {
        const { model, table, view } = plugin;
        const getShortcut = editCellShortcutFactory(plugin);

        super({
            key: EDIT_CELL_ENTER_COMMAND_KEY,
            priority: 1,
            shortcut: getShortcut('enter'),
            canExecute: ([cell, source] = [null, 'keyboard']) => {
                const editLet = view.edit.cell;
                cell = cell || model.navigation().cell;

                if (source !== 'navigation') {
                    const { codes } = model.keyboard();
                    if (codes.length && Keyboard.isControl(model.keyboard().codes[0])) {
                        return false;
                    }
                }

                const canEdit =
                    cell
                    && cell.column.canEdit
                    && (cell.column.category === 'control' || model.edit().mode === 'cell')
                    && model.edit().status === 'view';

                if (canEdit) {
                    const clientContext = editCellContextFactory(
                        cell,
                        cell.value,
                        cell.label,
                        editLet.tag
                    );

                    return model.edit().enter.canExecute(clientContext) === true;
                }

                return false;
            },
            execute: ([cell, source] = [null, 'keyboard']) => {
                const editLet = view.edit.cell;
                cell = cell || model.navigation().cell;

                if (cell) {
                    const clientContext = editCellContextFactory(
                        cell,
                        cell.value,
                        cell.label,
                        editLet.tag
                    );

                    if (model.edit().enter.execute(clientContext) !== true) {
                        const td = table.body.cell(cell.rowIndex, cell.columnIndex).model();
                        editLet.editor = new CellEditor(td);
                        const code = model.keyboard().codes[0];
                        if (code && Keyboard.isPrintable(code)) {
                            const parse = parseFactory(cell.column.type, cell.column.editor);
                            const value = Keyboard.stringify(code);
                            const typedValue = parse(value);
                            if (typedValue !== null) {
                                editLet.value = typedValue;
                            }
                        }

                        editLet.mode(editLet.editor.td, 'edit');
                        return true;
                    }
                }

                return false;
            }
        });
    }
}
