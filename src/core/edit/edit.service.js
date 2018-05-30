import { CellEditor } from './edit.cell.editor';
import { EditCellView } from './edit.cell.view';
import { CommandManager } from '../command/command.manager';

export class EditService {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	doBatch(startCell) {
		const view = this.model.view();
		const shortcut = { register: () => ({}) };
		const editView = new EditCellView(this.model, this.table, shortcut);
		
		const label = startCell.label;
		const value = startCell.value;
		
		const {rows, columns} = view;
		const startColumnType = startCell.column.type;
		const selectionItems = this.model.selection().items;
		for (let i = 0, itemsLength = selectionItems.length; i < itemsLength; i++) {
			const {row, column} = selectionItems[i];
			const rowIndex = rows.indexOf(row);
			const columnIndex = columns.indexOf(column);
			
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
