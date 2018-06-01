import { FakeElement } from '../fake/element';
import { isUndefined } from '../../utility/kit';

export class Selector {
	constructor(matrix, bag, factory, ) {
		this.matrix = matrix;
		this.bag = bag;
		this.factory = factory;
	}

	columnCount(rowIndex) {
		const row = this.matrix[rowIndex];
		return row ? row.cells.length : 0;
	}

	columnCells(columnIndex) {
		const { factory } = this;
		const result = this.matrix.map((row, i) => factory.cell(row.cells[columnIndex], i, columnIndex));
		return result;
	}

	rowCount(columnIndex) {
		const set = new Set(this.matrix.map(row => row.cells[columnIndex]));
		return set.size;
	}

	rows(columnIndex) {
		const rows = this.matrix;
		const factory = this.factory;
		const result = [];
		if (isUndefined(columnIndex)) {
			for (let i = 0, length = rows.length; i < length; i++) {
				const row = rows[i];
				result.push(factory.row(row.row, i));
			}
		} else {
			for (let i = 0, length = rows.length; i < length; i++) {
				const row = rows[i];
				result.push(factory.row(row[columnIndex].parentElement, i));
			}
		}

		return result;
	}

	rowCells(rowIndex) {
		return this.matrix[rowIndex].cells.map((cell, index) => this.factory.cell(cell, rowIndex, index));
	}

	row(rowIndex) {
		console.log(`row index: ${rowIndex}`)
		const row = this.matrix[rowIndex];
		const factory = this.factory;
		if (row) {
			return factory.row(row.row, rowIndex);
		}

		return factory.row(new FakeElement, rowIndex);
	}

	cell(rowIndex, columnIndex) {
		const row = this.matrix[rowIndex];
		const factory = this.factory;
		if (row) {
			return factory.cell(
				row.cells[columnIndex],
				rowIndex,
				columnIndex
			);
		}

		return factory.cell(
			new FakeElement(),
			rowIndex,
			columnIndex
		);
	}
}