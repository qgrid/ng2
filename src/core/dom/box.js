import { Row } from './row';
import { Column } from './column';
import { Cell } from './cell';
import { SelectorFactory } from './selector/selector.factory';

export class Box {
	constructor(context, model, selectorMark) {
		this.context = context;
		this.model = model;

		this.selectFactory = new SelectorFactory(context.bag, selectorMark);
	}

	columnCount(rowIndex) {
		return this.selector.columnCount(rowIndex);
	}

	column(columnIndex) {
		const columnFactory = this.createColumnCore.bind(this);
		return columnFactory(columnIndex);
	}

	columns(rowIndex) {
		const columnFactory = this.createColumnCore.bind(this);
		return this.selector
			.rowCells(rowIndex)
			.map(cell => columnFactory(cell.columnIndex));
	}

	row(rowIndex) {
		return this.rowCore(rowIndex);
	}

	rows(columnIndex) {
		const rowFactory = this.createRowCore.bind(this);
		return this.selector.rows(columnIndex).map(row => rowFactory(row.index, row.element));
	}

	rowCount(columnIndex) {
		return this.selector.rowCount(columnIndex);
	}

	cell(rowIndex, columnIndex) {
		return this.cellCore(rowIndex, columnIndex);
	}

	getElements() {
		return [];
	}

	rowCore(index) {
		const rowFactory = this.createRowCore.bind(this);
		return rowFactory(index, this.selector.row(index).element);
	}

	cellCore(rowIndex, columnIndex) {
		const cellFactory = this.createCellCore.bind(this);
		const cell = this.selector.cell(rowIndex, columnIndex);
		return cellFactory(cell.rowIndex, cell.columnIndex, cell.element);
	}

	rowCellsCore(rowIndex) {
		const cellFactory = this.createCellCore.bind(this);
		return this.selector
			.rowCells(rowIndex)
			.map(cell => cellFactory(cell.rowIndex, cell.columnIndex, cell.element));
	}

	columnCellsCore(columnIndex) {
		const cellFactory = this.createCellCore.bind(this);
		return this.selector
			.columnCells(columnIndex)
			.map(cell => cellFactory(cell.rowIndex, cell.columnIndex, cell.element));
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

	get selector() {
		return this.selectFactory.create();
	}
}