import {CellEditor} from './edit.cell.editor';
import {EditCellView} from './edit.cell.view';
import {CommandManager} from '../command/command.manager';

export class EditService {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	doBatch(startCell) {
		const label = startCell.label;
		const value = startCell.value;
		const editView = new EditCellView(this.model, this.table, new CommandManager());
		const set = this.table.body.context.bag.rows;
		const rows = Array.from(set);
		try {
			const startColumnType = startCell.column.type;
			const columnIndices = this.model.columnList().index;
			const selectionItems = this.model.selection().items;

			for (let i = 0, max = selectionItems.length; i < max; i++) {
				const {row, column} = selectionItems[i];
				const trCores = rows.filter(item => item.model === row);
				const key = column.key;
				const columnIndex = columnIndices.indexOf(key);
				const rowIndex = trCores[0].index;
				const cellView = this.table.body.cell(rowIndex, columnIndex).model();

				const cell = cellView.model;
				const type = cell.column.type;
				if (startColumnType === type) {
					const editor = new CellEditor(cell);
					editor.label = label;
					editor.value = value;
					editView.editor = editor;

					if (editView.batchCommit.canExecute()) {
						editView.batchCommit.execute();
					}
				}
			}
		}
		finally {
			editView.dispose();
		}
	}
}
