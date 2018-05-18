import { Element } from './element';
import { CellView } from '../scene/view/cell.view';

export class Cell extends Element {
	constructor(context, rowIndex, columnIndex, element = null) {
		super(element);

		this.context = context;
		this.rowIndex = rowIndex;
		this.columnIndex = columnIndex;
	}

	model() {
		return this.modelCore();
	}

	modelCore() {
		const model = this.context.bag.findModel(this.getElement());
		return model ? new CellView(model) : null;
	}
}