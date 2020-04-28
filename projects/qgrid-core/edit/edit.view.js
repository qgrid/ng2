import { EditCellView } from './edit.cell.view';
import { EditRowView } from './edit.row.view';

export class EditView {
	constructor(plugin, shortcut) {
		this.cell = new EditCellView(plugin, shortcut);
		this.row = new EditRowView(plugin, shortcut);
	}
}