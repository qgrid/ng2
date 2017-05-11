import {View} from '../view';
import {EditCellView} from './edit.cell.view';
import {EditRowView} from './edit.row.view';

export class EditView extends View {
	constructor(model, table, applyFactory) {
		super(model);

		this.cell = new EditCellView(model, table, applyFactory);
		this.row = new EditRowView(model, table, applyFactory);
	}

	onDestroy() {
		this.cell.destroy();
		this.row.destroy();
	}
}