import {Cell} from '../cell';

export class VirtualCell extends Cell {
	constructor(box, rowIndex, columnIndex, element = null) {
		super(box.context, rowIndex, columnIndex, element);

		this.box = box;
	}

	addClass(name) {
		this.box.addCellClass(this, name);
	}

	removeClass(name) {
		this.box.removeCellClass(this, name);

	}
}
