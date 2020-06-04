import { EditCellLet } from './edit.cell.let';
import { EditRowLet } from './edit.row.let';

export class EditLet {
	constructor(plugin) {
		this.cell = new EditCellLet(plugin);
		this.row = new EditRowLet(plugin);
	}
}