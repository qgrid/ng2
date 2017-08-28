import {VirtualCell} from './cell';
import {VirtualRow} from './row';
import {VirtualColumn} from './column';
import {Box} from '../box';
import {CellBox} from './cell.box';
import {RowBox} from './row.box';
import {ColumnBox} from './column.box';
import {FakeElement} from '../fake';

export class VirtualBox extends Box {
	constructor(context, model, selectorMark) {
		super(context, model, selectorMark);

		this.cellBox = new CellBox(context);
		this.rowBox = new RowBox(context);
		this.columnBox = new ColumnBox(context);
	}

	addCellClass(cell, name, force = false) {
		if (force) {
			cell.addClassCore(name);
		}
		else {
			this.cellBox.addClass(cell, name);
		}
	}

	removeCellClass(cell, name, force = false) {
		if (force) {
			cell.removeClassCore(name);
		}
		else {
			this.cellBox.removeClass(cell, name);
		}
	}

	addRowClass(row, name, force = false) {
		if (force) {
			row.addClassCore(name);
		}
		else {
			this.rowBox.addClass(row, name);
		}
	}

	removeRowClass(row, name, force = false) {
		if (force) {
			row.removeClassCore(name);
		}
		else {
			this.rowBox.removeClass(row, name);
		}
	}

	addColumnClass(column, name, force = false) {
		if (force) {
			column.addClassCore(name);
		}
		else {
			this.columnBox.addClass(column, name);
		}
	}

	removeColumnClass(column, name, force = false) {
		if (force) {
			column.removeClassCore(name);
		}
		else {
			this.columnBox.removeClass(column, name);
		}
	}

	rowCore(index) {
		const viewIndex = this.context.mapper.rowToView(index);
		if (viewIndex >= 0 && viewIndex < super.rowCount(0)) {
			return super.rowCore(viewIndex);
		}

		const rowFactory = this.createRowCore.bind(this);
		return rowFactory(viewIndex, new FakeElement());
	}

	cellCore(rowIndex, columnIndex) {
		const mapper = this.context.mapper;
		const viewRowIndex = mapper.rowToView(rowIndex);
		const viewColumnIndex = mapper.columnToView(columnIndex);
		if (viewRowIndex >= 0 && viewRowIndex < super.rowCount(viewColumnIndex)) {
			return super.cellCore(viewRowIndex, viewColumnIndex);
		}

		const cellFactory = this.createCellCore.bind(this);
		return cellFactory(viewRowIndex, viewColumnIndex, new FakeElement());
	}

	rowCellsCore(index) {
		const viewIndex = this.context.mapper.rowToView(index);
		if (viewIndex >= 0 && viewIndex < super.rowCount(0)) {
			return super.rowCellsCore(viewIndex);
		}

		const cellFactory = this.createCellCore.bind(this);
		return super.rowCellsCore(0).map((cell, i) => cellFactory(viewIndex, i, new FakeElement()));
	}

	createRowCore(index, element) {
		return new VirtualRow(this, index, element);
	}

	createCellCore(rowIndex, columnIndex, element) {
		return new VirtualCell(this, rowIndex, columnIndex, element);
	}

	createColumnCore(index) {
		return new VirtualColumn(this, index);
	}
}