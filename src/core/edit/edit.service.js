import { CellEditor } from './edit.cell.editor';
import { EditCellView } from './edit.cell.view';
import { CommandManager } from '../command/command.manager';

export class EditService {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	doBatch(startCell) {
		const shortcut = { register: () => ({}) };
		const label = startCell.label;
		const value = startCell.value;
		const editView = new EditCellView(this.model, this.table, shortcut);

		const startColumnType = startCell.column.type;
		const columnIndices = this.model.columnList().index;
		const selectionItems = this.model.selection().items;
		for (let i = 0, max = selectionItems.length; i < max; i++) {
			const { row, column } = selectionItems[i];
			const key = column.key;
			const columnIndex = columnIndices.indexOf(key);
			const rowIndex = row.id;
			const cellView = this.table.body.cell(rowIndex, columnIndex).model();

			const cell = cellView.model;
			const type = cell.column.type;
			if (startColumnType === type) {
				const editor = new CellEditor(cell);
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
