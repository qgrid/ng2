export class Column {
	constructor(box, index) {
		this.box = box;
		this.index = index;
	}

	model() {
		const { columns } = this.box.model.view();
		const column = columns[this.index];
		return column || null;
	}

	cells() {
		return this.box.columnCellsCore(this.index);
	}

	cell(rowIndex) {
		return this.box.cell(rowIndex, this.index);
	}

	addClass(name) {
		const cells = this.cells();
		const length = cells.length;
		let i = 0;
		while (i < length) {
			const cell = cells[i++];
			cell.addClass(name);
		}
	}

	removeClass(name) {
		const cells = this.cells();
		const length = cells.length;
		let i = 0;
		while (i < length) {
			const cell = cells[i++];
			cell.removeClass(name);
		}
	}
}