export class Column {
	constructor(box, index) {
		this.box = box;
		this.index = index;
	}

	cells() {
		return this.box.columnCellsCore(this.index);
	}

	cell(rowIndex) {
		return this.box.cell(rowIndex, this.index);
	}

	addClass(name) {
		this.cells().forEach(cell => cell.addClass(name));
	}

	removeClass(name) {
		this.cells().forEach(cell => cell.removeClass(name));
	}
}