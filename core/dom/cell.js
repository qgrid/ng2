import {Element} from './element';
import {Cell as CellModel} from '../cell';

export class Cell extends Element {
	constructor(context, rowIndex, columnIndex, element = null) {
		super(element);

		this.context = context;
		this.rowIndex = rowIndex;
		this.columnIndex = columnIndex;
	}

	get model() {
		const model = this.context.model(this.getElement());
		return model ? new CellModel(model) : null;
	}
}