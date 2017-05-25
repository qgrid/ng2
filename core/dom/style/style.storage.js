export class StyleStorage {
	constructor() {
		this.items = {};
	}

	addCellClass(name, rowIndex, columnIndex) {
		this.setItem(name, rowIndex, columnIndex);
	}

	removeCellClass(name, rowIndex, columnIndex) {
		this.unsetItem(name, rowIndex, columnIndex);
	}

	addRowClass(name, index) {
		this.setItem(name, index, null);
	}

	removeRowClass(name, index) {
		this.unsetItem(name, index, null);
	}

	getItem(rowIndex, columnIndex) {
		const key = this.key(rowIndex, columnIndex);
		if (this.items.hasOwnProperty(key)) {
			return this.items[key];
		}

		return null;
	}

	setItem(name, rowIndex, columnIndex) {
		const key = this.key(rowIndex, columnIndex);
		let entry = this.items[key];
		if (!entry) {
			const entries = this.items[key] = {};
			this.items[key] = entry = {};
		}

		entry[name] = true;
	}

	unsetItem(name, rowIndex, columnIndex) {

	}

	key(rowIndex, columnIndex) {
		return `${rowIndex}x${columnIndex}`;
	}
}