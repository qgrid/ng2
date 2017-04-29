import View from 'core/view/view';
import EditCellView from './edit.cell.view';
import EditRowView from './edit.row.view';

export default class EditView extends View {
	constructor(model, table, apply) {
		super(model);

		this.cell = new EditCellView(model, table, apply);
		this.row = new EditRowView(model, table, apply);
	}

	onDestroy() {
		this.cell.destroy();
	}
}