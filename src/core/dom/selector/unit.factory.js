export class UnitFactory {
	constructor(rowRange, columnRange) {
		this.rowRange = rowRange;
		this.columnRange = columnRange;
	}

	cell(element, rowIndex, columnIndex) {
		return {
			element,
			rowIndex: rowIndex + this.rowRange.start,
			columnIndex: columnIndex + this.columnRange.start
		};
	}

	row(element, rowIndex) {
		return {
			element,
			index: rowIndex + this.rowRange.start
		};
	}
}