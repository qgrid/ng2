import { EditCellLet } from './edit.cell.let';
import { EditRowLet } from './edit.row.let';

export class EditLet {
	constructor(plugin, shortcut) {
		this.cell = new EditCellLet(plugin, shortcut);
		this.row = new EditRowLet(plugin, shortcut);
	}
}