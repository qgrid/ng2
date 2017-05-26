import {Row} from './row';
import {Column} from './column';
import {Cell} from './cell';
import {FakeTable, FakeElement} from './fake';
import {Container} from './container';
import {flatten, zip, sumBy, max} from '../services/utility';

export class Box {
	constructor(context, model) {
		this.context = context;
		this.gridModel = model;
	}

	cell(rowIndex, columnIndex) {
		rowIndex = this.context.mapper.row(rowIndex);
		columnIndex = this.context.mapper.column(columnIndex);

		if (rowIndex >= 0 && rowIndex < this.rowCount()) {
			if (columnIndex >= 0 && columnIndex < this.columnCount()) {
				const elements = this.getElements();
				const cells = flatten(elements.map(element => Array.from(this.rowsCore(element)[rowIndex].cells)));
				return new Cell(this.context, cells[columnIndex]);
			}
		}

		return new Cell(this.context, new FakeElement());
	}

	column(index) {
		index = this.context.mapper.column(index);
		if (index >= 0 && index < this.columnCount()) {
			return new Column(this, index);
		}

		return new Column(this, -1);
	}

	row(index) {
		index = this.context.mapper.row(index);
		if (index >= 0 && index < this.rowCount()) {
			const elements = this.getElements();
			const box = elements.map(element => this.rowsCore(element)[index]);
			return new Row(this, index, new Container(box));
		}

		return new Row(this, -1, new FakeElement());
	}

	rows() {
		const elements = this.getElements();
		if (elements.length > 0) {
			if (elements.length > 1) {
				const rows = zip(...elements.map(element => this.rowsCore(element)));
				return rows.map((entry, index) => new Row(this, index, new Container(entry)));
			}

			return this.rowsCore(elements[0]).map((row, index) => new Row(this, index, row));
		}

		return [];
	}

	rowCount() {
		// TODO: improve performance
		const elements = this.getElements();
		return max(elements.map(element => this.rowsCore(element).length));
	}

	columnCount() {
		// TODO: improve performance
		const elements = this.getElements();
		return sumBy(elements, element => {
			const rows = this.rowsCore(element);
			return rows.length ? rows[0].cells.length : 0;
		});
	}

	getElements() {
		return this.getElementsCore() || [new FakeTable()];
	}

	getElementsCore() {
		return null;
	}

	rowsCore(element) {
		const rows = element.rows;
		const isDataRow = this.context.isDataRow;
		const result = [];
		for (let i = 0, length = rows.length; i < length; i++) {
			const row = rows[i];
			if (!isDataRow(row)) {
				continue;
			}

			result.push(row);
		}

		return result;
	}

	rowCellsCore(index) {
		if (index >= 0 && index < this.rowCount()) {
			const elements = this.getElements();
			const context = this.context;
			const cells = flatten(elements.map(element => Array.from(this.rowsCore(element)[index].cells)));
			return cells.map(cell => new Cell(context, cell));
		}

		return [];
	}

	columnCellsCore(index) {
		const context = this.context;
		const column = this.findColumnCore(index);
		if (column) {
			return column.rows.map(row => new Cell(context, row.cells[column.index]));
		}

		return [];
	}

	findColumnCore(index) {
		if (index >= 0 && this.rowCount() > 0) {
			const elements = this.getElements();
			let startIndex = 0;
			for (let i = 0, length = elements.length; i < length; i++) {
				const element = elements[i];
				const rows = this.rowsCore(element);
				const cells = rows[0].cells;
				const endIndex = startIndex + cells.length;
				if (index < endIndex) {
					return {
						rows: rows,
						index: index - startIndex
					};
				}

				startIndex = endIndex;
			}
		}

		return null;
	}
}