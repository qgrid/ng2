export class Bag {
	constructor() {
		this.rows = new Set();
		this.cells = new Set();
		this.models = new Map();
	}

	findModel(element) {
		return this.models.get(element);
	}

	hasModel(element) {
		return this.models.has(element);
	}

	addRow(row) {
		this.rows.add(row);
		this.models.set(row.element, row);
	}

	addCell(cell) {
		this.cells.add(cell);
		this.models.set(cell.element, cell);
	}

	deleteRow(row) {
		this.rows.delete(row);
		this.models.delete(row.element);
	}

	deleteCell(cell) {
		this.cells.delete(cell);
		this.models.delete(cell.element);
	}
}