import {Cell} from '../cell';

export class VirtualCell extends Cell {
	constructor(box, rowIndex, columnIndex, element = null) {
		super(box.context, rowIndex, columnIndex, element);

		this.box = box;
	}

	addClass(name, force = false) {
		this.box.addCellClass(this, name, force);
	}

	removeClass(name, force = false) {
		this.box.removeCellClass(this, name, force);

	}
}
