import {Element} from './element';
import {Row as RowModel} from '../row';

export class Row extends Element {
	constructor(box, index, element = null) {
		super(element);

		this.box = box;
		this.index = index;
	}

	get model() {
		const model = this.box.context.bag.findModel(this.getKeyElementCore());
		return model ? new RowModel(model) : null;
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