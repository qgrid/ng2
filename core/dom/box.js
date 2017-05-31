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
		return this.cellCore(rowIndex, columnIndex);
	}

	column(index) {
		const columnFactory = this.createColumnCore.bind(this);
		index = this.context.mapper.column(index);
		if (index >= 0 && index < this.columnCount()) {
			return columnFactory(index);
		}

		return columnFactory(-1);
	}

	row(index) {
		index = this.context.mapper.row(index);
		return this.rowCore(index);
	}

	rows() {
		const rowFactory = this.createRowCore.bind(this);
		const elements = this.getElements();
		if (elements.length > 0) {
			if (elements.length > 1) {
				const rows = zip(...elements.map(element => this.rowsCore(element)));
				return rows.map((entry, index) => rowFactory(index, new Container(entry)));
			}

			return this.rowsCore(elements[0]).map((row, index) => rowFactory(index, row));
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

	rowCore(index) {
		const rowFactory = this.createRowCore.bind(this);
		if (index >= 0 && index < this.rowCount()) {
			const elements = this.getElements();
			if (elements.length > 0) {
				if (elements.length > 1) {
					const box = elements.map(element => this.rowsCore(element)[index]);
					return rowFactory(index, new Container(box));
				}

				return rowFactory(index, this.rowsCore(elements[0])[index]);
			}
		}

		return rowFactory(-1, new FakeElement());
	}

	cellCore(rowIndex, columnIndex) {
		const cellFactory = this.createCellCore.bind(this);
		if (rowIndex >= 0 && rowIndex < this.rowCount()) {
			if (columnIndex >= 0 && columnIndex < this.columnCount()) {
				const elements = this.getElements();
				const cells = flatten(elements.map(element => Array.from(this.rowsCore(element)[rowIndex].cells)));
				return cellFactory(rowIndex, columnIndex, cells[columnIndex]);
			}
		}

		return cellFactory(rowIndex, columnIndex, new FakeElement());
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
		const cellFactory = this.createCellCore.bind(this);
		if (index >= 0 && index < this.rowCount()) {
			const elements = this.getElements();
			const cells = flatten(elements.map(element => Array.from(this.rowsCore(element)[index].cells)));
			return cells.map((cell, i) => cellFactory(index, i, cell));
		}

		return [];
	}

	columnCellsCore(index) {
		const cellFactory = this.createCellCore.bind(this);
		const column = this.findColumnCore(index);
		if (column) {
			return column.rows.map((row, i) => cellFactory(i, index, row.cells[column.index]));
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

	createRowCore(index, element) {
		return new Row(this, index, element);
	}

	createColumnCore(index) {
		return new Column(this, index);
	}

	createCellCore(rowIndex, columnIndex, element) {
		return new Cell(this.context, rowIndex, columnIndex, element);
	}
}