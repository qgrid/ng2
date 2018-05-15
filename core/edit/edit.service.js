import {CellEditor} from './edit.cell.editor';
import {EditCellView} from './edit.cell.view';
import {CommandManager} from '../command/command.manager';

export class EditService {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	doBatch(startCell) {
		const view = this.model.view();
		const editView = new EditCellView(this.model, this.table, new CommandManager());

		const label = startCell.label;
		const value = startCell.value;

		const rows = view.rows;
		const columns = view.columns;
		try {
			const startColumnType = startCell.column.type;
			const selectionItems = this.model.selection().items;

			for (let i = 0, max = selectionItems.length; i < max; i++) {
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
