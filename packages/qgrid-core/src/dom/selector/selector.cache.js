export class SelectorCache {
	constructor(selector) {
		this.selector = selector;

		this.clear();
	}

	clear() {
		this.columnCountCache = {};
		this.columnCellsCache = {};
		this.rowCountCache = {};
		this.rowsCache = {};
		this.rowCellsCache = {};
		this.rowCache = {};
		this.cellCache = {};
	}

	columnCount(rowIndex) {
		if (this.columnCountCache.hasOwnProperty(rowIndex)) {
			return this.columnCountCache.get(rowIndex);
		}

		return this.columnCountCache[rowIndex] = this.selector.columnCount(rowIndex);
	}

	columnCells(columnIndex) {
		if (this.columnCells.hasOwnProperty(columnIndex)) {
			return this.columnCells.get(columnIndex);
		}

		return this.columnCells[columnIndex] = this.selector.columnCells(columnIndex);
	}

	rowCount(columnIndex) {
		if (this.rowCountCache.hasOwnProperty(columnIndex)) {
			return this.rowCountCache.get(columnIndex);
		}

		return this.rowCountCache[columnIndex] = this.selector.rowCount(columnIndex);
	}

	rows(columnIndex) {
		if (this.rowsCache.hasOwnProperty(columnIndex)) {
			return this.rowsCache.get(columnIndex);
		}

		return this.rowsCache[columnIndex] = this.selector.rows(columnIndex);
	}

	rowCells(rowIndex) {
		if (this.rowCellsCache.hasOwnProperty(rowIndex)) {
			return this.rowCellsCache.get(rowIndex);
		}

		return this.rowCellsCache[rowIndex] = this.selector.rowCells(rowIndex);
	}

	row(rowIndex, columnIndex) {
		const key = `${rowIndex}x${columnIndex}`;
		if (this.rowCache.hasOwnProperty(key)) {
			return this.rowCache.get(key);
		}

		return this.rowCache[key] = this.selector.row(rowIndex, columnIndex);
	}

	cell(rowIndex, columnIndex) {
		const key = `${rowIndex}x${columnIndex}`;
		if (this.cellCache.hasOwnProperty(key)) {
			return this.cellCache.get(key);
		}

		return this.cellCache[key] = this.selector.cell(rowIndex, columnIndex);
	}
}