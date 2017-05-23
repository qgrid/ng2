import {Row} from './row';
import {Column} from './column';
import {Cell} from './cell';
import {FakeTable, FakeElement} from './fake';
import {Container} from './container';
import {flatten, sumBy, max, zip} from '../services/utility';

export class Box {
	constructor(context, model) {
		this.context = context;
		this.gridModel = model;
	}

	cell(row, column) {
		if (row >= 0 && row < this.rowCount()) {
			if (column >= 0 && column < this.columnCount()) {
				const elements = this.getElements();
				const cells = flatten(elements.map(element => Array.from(element.rows[row].cells)));
				return new Cell(this.context, cells[column]);
			}
		}

		return new Cell(this.context, new FakeElement());
	}

	column(index) {
		if (index >= 0 && index < this.columnCount()) {
			return new Column(this, index);
		}

		return new Column(this, -1);
	}

	row(index) {
		if (index >= 0 && index < this.rowCount()) {
			const elements = this.getElements();
			const box = elements.map(element => element.rows[index]);
			return new Row(this, index, new Container(box));
		}

		return new Row(this, -1, new FakeElement());
	}

	rows() {
		const elements = this.getElements();
		if (elements.length > 0) {
			if (elements.length > 1) {
				const rows = zip(...elements.map(element => Array.from(element.rows)));
				return rows.map((entry, index) => new Row(this, index, new Container(entry)));
			}
			return Array.from(elements[0].rows).map((row, index) => new Row(this, index, row));
		}

		return [];
	}

	rowCount() {
		const elements = this.getElements();
		return max(elements.map(element => element.rows.length));
	}

	columnCount() {
		const elements = this.getElements();
		return sumBy(elements, element => element.rows.length > 0 ? element.rows[0].cells.length : 0);
	}

	getElements() {
		return this.getElementsCore() || [new FakeTable()];
	}

	getElementsCore() {
		return null;
	}

	rowCellsCore(index) {
		if (index >= 0 && index < this.rowCount()) {
			const elements = this.getElements();
			const context = this.context;
			const cells = flatten(elements.map(element => Array.from(element.rows[index].cells)));
			return cells.map(cell => new Cell(context, cell));
		}

		return [];
	}

	columnCellsCore(index) {
		const context = this.context;
		const column = this.findColumnCore(index);
		if (column) {
			return Array.from(column.rows).map(row => new Cell(context, row.cells[column.index]));
		}

		return [];
	}

	findColumnCore(index) {
		if (index >= 0 && this.rowCount() > 0) {
			const elements = this.getElements();
			let startIndex = 0;
			for (let i = 0, length = elements.length; i < length; i++) {
				const element = elements[i];
				const cells = element.rows[0].cells;
				const endIndex = startIndex + cells.length;
				if (index < endIndex) {
					return {
						rows: element.rows,
						index: index - startIndex
					};
				}

				startIndex = endIndex;
			}
		}

		return null;
	}
}