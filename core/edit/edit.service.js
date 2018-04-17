import { CellEditor } from './edit.cell.editor';

export class EditService {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	doBatch(startCell) {
		const label = startCell.label;
		const value = startCell.value;
		const startColumnType = startCell.column.type;
		const columnIndices = this.model.columnList().index;
		const selectionItems = this.model.selection().items;

		for (let i = 0, max = selectionItems.length; i < max; i++) {
			const {row, column} = selectionItems[i];
			const key = column.key;
			const columnIndex = columnIndices.indexOf(key);
			const rowIndex = row.id;
			const cellView = this.table.body.cell(rowIndex, columnIndex).model();

			const cell = cellView.model;
			const type = cell.column.type;
			if (startColumnType === type && startColumnType !== 'id') {
				const cellEditor = new CellEditor(cell);
				cellEditor.label = label;
				cellEditor.value = value;
				cellEditor.commit();
			}
		}
	}
}
