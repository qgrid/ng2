import { Element } from './element';
import { Tr } from './tr';

export class Row extends Element {
	constructor(box, index, element = null) {
		super(element);

		this.box = box;
		this.index = index;
	}

	model() {
		const tr = this.box.context.bag.findModel(this.getKeyElementCore());
		if (tr) {
			return new Tr(tr);
		}

		return null;
	}

	cells() {
		return this.box.rowCellsCore(this.index);
	}

	cell(columnIndex) {
		return this.box.cellCore(this.index, columnIndex);
	}

	getKeyElementCore() {
		const element = super.getElement();
		if (element.elements) {
			return element.elements[0];
		}

		return element;
	}
}