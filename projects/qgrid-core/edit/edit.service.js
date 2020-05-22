import { CellEditor } from './edit.cell.editor';
import { EditCellLet } from './edit.cell.let';

export class EditService {
	constructor(plugin) {
		this.plugin = plugin;
	}

	startBatch(startCell) {
		const { model } = this.plugin;

		const editStatus = model.edit().status;
		const selectionMode = model.selection().mode;

		model.selection({ mode: 'range' });
		model.edit({ status: 'startBatch' });

		return () => {
			model.edit({ status: editStatus });
			this.doBatch(startCell);
			model.selection({ mode: selectionMode });
		}
	}

	doBatch(startCell) {
		const { table, model } = this.plugin;

		const { rows } = model.scene();
		const { columns } = model.view();
		const { items } = model.selection();

		const shortcut = { register: () => ({}), keyCode: () => '' };
		const editView = new EditCellLet(this.plugin, shortcut);

		const startTd = table.body.cell(startCell.rowIndex, startCell.columnIndex).model();
		const { value, label } = startTd;

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
