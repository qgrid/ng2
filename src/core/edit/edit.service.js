import { CellEditor } from './edit.cell.editor';
import { EditCellView } from './edit.cell.view';
import { CommandManager } from '../command/command.manager';

export class EditService {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	doBatch(startCell) {
		const { table, model } = this;
		const { rows, columns } = model.view();
		const { items } = model.selection();

		const shortcut = { register: () => ({}) };
		const editView = new EditCellView(model, table, shortcut);
		const startTd = this.table.body.cell(startCell.rowIndex, startCell.columnIndex).model();

		const label = startTd.label;
		const value = startTd.value;

		const startColumnType = startTd.column.type;
		for (let i = 0, length = items.length; i < length; i++) {
			const { row, column } = items[i];
			const rowIndex = rows.indexOf(row);
			const columnIndex = columns.indexOf(column);

			const td = table.body.cell(rowIndex, columnIndex).model();
			const type = td.column.type;
			if (startColumnType === type) {
				const editor = new CellEditor(td);
				editor.label = label;
				editor.value = value;

				editView.editor = editor;
				if (editView.push.canExecute()) {
					editView.push.execute();
				}
			}
		}
	}
}
