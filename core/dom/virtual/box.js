import {VirtualCell} from './cell';
import {VirtualRow} from './row';
import {Box} from '../box';
import {CellBox} from './cell.box';
import {RowBox} from './row.box';

export class VirtualBox extends Box {
	constructor(context, model) {
		super(context, model);

		this.cellBox = new CellBox(this);
		this.rowBox = new RowBox(this);
	}

	invalidate() {
		this.rowBox.invalidate();
		this.cellBox.invalidate();
	}

	addCellClass(cell, name) {
		this.cellBox.addClass(cell, name);
		cell.addClassCore(name);
	}

	removeCellClass(cell, name) {
		this.cellBox.removeClass(cell, name);
		cell.removeClassCore(name);
	}

	addRowClass(row, name) {
		this.rowBox.addClass(row, name);
		row.addClassCore(name);
	}

	removeRowClass(row, name) {
		this.rowBox.removeClass(row, name);
		row.removeClassCore(name);
	}

	createRowCore(index, element) {
		return new VirtualRow(this, index, element);
	}

	createCellCore(rowIndex, columnIndex, element) {
		return new VirtualCell(this, rowIndex, columnIndex, element);
	}
}