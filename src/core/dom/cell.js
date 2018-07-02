import { Element } from './element';
import { Td } from './td';

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
		const td = this.context.bag.findModel(this.getElement());
		return td ? new Td(td) : null;
	}
}