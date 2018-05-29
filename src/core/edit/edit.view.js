import { EditCellView } from './edit.cell.view';
import { EditRowView } from './edit.row.view';

export class EditView {
	constructor(model, table, shortcut) {
		this.cell = new EditCellView(model, table, shortcut);
		this.row = new EditRowView(model, table, shortcut);
	}
}