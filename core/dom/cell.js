import {Element} from './element';
import {CellView} from '../scene/view';

export class Cell extends Element {
	constructor(context, rowIndex, columnIndex, element = null) {
		super(element);

		this.context = context;
		this.rowIndex = rowIndex;
		this.columnIndex = columnIndex;
		const model = this.model();
		this.columnKey = model ? model.columnKey : null;
	}

	model() {
		const model = this.context.bag.findModel(this.getElement());
		return model ? new CellView(model) : null;
	}
}
