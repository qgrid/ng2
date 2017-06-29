import {VirtualCell} from './cell';
import {VirtualRow} from './row';
import {Box} from '../box';
import {CellBox} from './cell.box';
import {RowBox} from './row.box';

export class VirtualBox extends Box {
	constructor(context, model) {
		super(context, model);

		this.cellBox = new CellBox(context);
		this.rowBox = new RowBox(context);
	}

	addCellClass(cell, name, force = false) {
		if (force) {
			cell.addClassCore(name);
		}
		else {
			this.cellBox.addClass(cell, name);
		}
	}

	removeCellClass(cell, name, force = false) {
		if (force) {
			cell.removeClassCore(name);
		}
		else {
			this.cellBox.removeClass(cell, name);
		}
	}

	addRowClass(row, name, force = false) {
		if (force) {
			row.addClassCore(name);
		}
		else {
			this.rowBox.addClass(row, name);
		}
	}

	removeRowClass(row, name, force = false) {
		if (force) {
			row.removeClassCore(name);
		}
		else {
			this.rowBox.removeClass(row, name);
		}
	}

	createRowCore(index, element) {
		return new VirtualRow(this, index, element);
	}

	createCellCore(rowIndex, columnIndex, element) {
		return new VirtualCell(this, rowIndex, columnIndex, element);
	}
}