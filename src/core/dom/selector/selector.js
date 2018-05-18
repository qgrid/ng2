import { FakeElement } from '../fake/element';
import { isUndefined } from '../../utility/kit';

export class Selector {
	constructor(element, bag, factory) {
		this.element = element;
		this.bag = bag;
		this.factory = factory;
	}

	columnCount(rowIndex) {
		const rows = this.rowsCore();
		const row = rows[rowIndex];
		return row ? row.cells.length : 0;
	}

	columnCells(columnIndex) {
		const rows = this.rowsCore();
		const factory = this.factory;
		const findCell = this.findCellFactory(columnIndex);
		const result = [];
		for (let i = 0, length = rows.length; i < length; i++) {
			const row = rows[i];
			const cell = findCell(row);
			if (cell) {
				result.push(
					factory.cell(
						cell,
						i,
						columnIndex
					));
			}
		}

		return result;
	}

	rowCount(columnIndex) {
		const rows = this.rowsCore();
		const findCell = this.findCellFactory(columnIndex);
		let count = 0;
		for (let i = 0, length = rows.length; i < length; i++) {
			const row = rows[i];
			const cell = findCell(row);
			if (cell) {
				count += cell.rowSpan;
			}
		}

		return count;
	}

	rows(columnIndex) {
		const rows = this.rowsCore();
		const factory = this.factory;
		const result = [];
		if (isUndefined(columnIndex)) {
			for (let i = 0, length = rows.length; i < length; i++) {
				const row = rows[i];
				result.push(factory.row(row, i));
			}
		}
		else {
			const findCell = this.findCellFactory(columnIndex);
			for (let i = 0, length = rows.length; i < length; i++) {
				const row = rows[i];
				const cell = findCell(row);
				if (cell) {
					result.push(factory.row(row, i));
				}
			}
		}

		return result;
	}

	rowCells(rowIndex) {
		const rows = this.rowsCore();
		const row = rows[rowIndex];
		const factory = this.factory;
		const result = [];
		if (row) {
			const cells = row.cells;
			let index = 0;
			for (let i = 0, length = cells.length; i < length; i++) {
				const cell = cells[i];
				result.push(
					factory.cell(
						cell,
						rowIndex,
						index
					));

				index += cell.colSpan;
			}
		}

		return result;
	}

	row(rowIndex) {
		const rows = this.rowsCore();
		const row = rows[rowIndex];
		const factory = this.factory;
		if (row) {
			return factory.row(row, rowIndex);
		}

		return factory.row(new FakeElement, rowIndex);
	}

	cell(rowIndex, columnIndex) {
		const rows = this.rowsCore();
		const row = rows[rowIndex];
		const factory = this.factory;
		if (row) {
			const findCell = this.findCellFactory(columnIndex);
			const cell = findCell(row);
			if (cell) {
				return factory.cell(
					cell,
					rowIndex,
					columnIndex
				);
			}
		}

		return factory.cell(
			new FakeElement(),
			rowIndex,
			columnIndex
		);
	}

	findCellFactory(columnIndex) {
		return row => {
			const cells = row.cells;
			const length = cells.length;
			let cursor = 0;
			let index = 0;
			while (cursor < length) {
				if (cursor === columnIndex) {
					return cells[index];
				}

				if (cursor > columnIndex) {
					break;
				}

				cursor += cells[index++].colSpan;
			}

			return null;
		};
	}

	rowsCore() {
		// to increase performance we use private property bag.models
		const dataRows = this.bag.models;
		const rows = this.element.rows;
		const result = [];
		for (let i = 0, length = rows.length; i < length; i++) {
			const row = rows[i];
			if (dataRows.has(row)) {
				result.push(row);
			}
		}

		return result;
	}
}