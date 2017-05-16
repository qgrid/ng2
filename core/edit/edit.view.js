import {View} from '../view';
import {EditCellView} from './edit.cell.view';
import {EditRowView} from './edit.row.view';

export class EditView extends View {
	constructor(model, table, commandManager) {
		super(model);

		this.cell = new EditCellView(model, table, commandManager);
		this.row = new EditRowView(model, table, commandManager);
	}

	onDestroy() {
		this.cell.destroy();
		this.row.destroy();
	}
}