import { VirtualCell } from './cell';
import { VirtualRow } from './row';
import { VirtualColumn } from './column';
import { Box } from '../box';
import { CellBox } from './cell.box';
import { RowBox } from './row.box';
import { ColumnBox } from './column.box';
import { VirtualElement } from './element';
import { isFunction } from '../../utility/kit';
import { Event } from '../../infrastructure/event';

export class VirtualBox extends Box {
	constructor(context, model, selectorMark) {
		super(context, model, selectorMark);

		this.cellBox = new CellBox(context);
		this.rowBox = new RowBox(context);
		this.columnBox = new ColumnBox(context);
		this.changed = new Event();
	}

	addCellClass(cell, name, force = false) {
		if (force) {
			cell.addClassCore(name);
		}
		else {
			this.cellBox.addClass(cell, name);
			this.changed.emit({ source: 'addCellClass' });
		}
	}

	removeCellClass(cell, name, force = false) {
		if (force) {
			cell.removeClassCore(name);
		}
		else {
			this.cellBox.removeClass(cell, name);
			this.changed.emit({ source: 'removeCellClass' });
		}
	}

	addRowClass(row, name, force = false) {
		if (force) {
			row.addClassCore(name);
		}
		else {
			this.rowBox.addClass(row, name);
			this.changed.emit({ source: 'addRowClass' });
		}
	}

	removeRowClass(row, name, force = false) {
		if (force) {
			row.removeClassCore(name);
		}
		else {
			this.rowBox.removeClass(row, name);
			this.changed.emit({ source: 'removeRowClass' });
		}
	}

	addColumnClass(column, name, force = false) {
		if (force) {
			column.addClassCore(name);
		}
		else {
			this.columnBox.addClass(column, name);
			this.changed.emit({ source: 'addColumnClass' });
		}
	}

	removeColumnClass(column, name, force = false) {
		if (force) {
			column.removeClassCore(name);
		}
		else {
			this.columnBox.removeClass(column, name);
			this.changed.emit({ source: 'removeColumnClass' });
		}
	}

	columns() {
		const columns = this.context.view.columns();
		const columnFactory = this.createColumnCore.bind(this);
		return columns.map(column => columnFactory(column.index));
	}

	rowCount() {
		return this.model.pagination().count;
	}

	rowCore(index) {
		const viewIndex = this.context.mapper.rowToView(index);
		if (viewIndex >= 0 && viewIndex < super.rowCount(0)) {
			return super.rowCore(viewIndex);
		}

		const rowFactory = this.createRowCore.bind(this);
		const createRect = this.createRectFactory();
		return rowFactory(viewIndex, new VirtualElement(createRect(viewIndex)));
	}

	cellCore(rowIndex, columnIndex) {
		const mapper = this.context.mapper;
		const viewRowIndex = mapper.rowToView(rowIndex);
		const viewColumnIndex = mapper.columnToView(columnIndex);
		if (viewRowIndex >= 0 && viewRowIndex < super.rowCount(viewColumnIndex)) {
			return super.cellCore(viewRowIndex, viewColumnIndex);
		}

		const cellFactory = this.createCellCore.bind(this);
		const createRect = this.createRectFactory();
		return cellFactory(viewRowIndex, viewColumnIndex, new VirtualElement(createRect(viewRowIndex)));
	}

	rowCellsCore(index) {
		const viewIndex = this.context.mapper.rowToView(index);
		if (viewIndex >= 0 && viewIndex < super.rowCount(0)) {
			return super.rowCellsCore(viewIndex);
		}

		const cellFactory = this.createCellCore.bind(this);
		const createRect = this.createRectFactory();
		return super
			.rowCellsCore(0)
			.map((cell, i) => cellFactory(viewIndex, i, new VirtualElement(createRect(index))));
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

	createRectFactory() {
		const height = this.model.row().height;
		const getHeight = isFunction(height) ? height : () => height;

		let rect = null;
		// as view.rect() can call getBoundingClientRect that impacts performance
		// and as virtual element rect function is used mostly for end/home navigation we make rect lazy
		return index => () => {
			if (!rect) {
				rect = this.context.view.rect();
			}

			// TODO: add correct left, right, width
			const height = getHeight(null, index);
			return {
				left: 0,
				right: 0,
				top: rect.top + height * index,
				bottom: rect.top + height * (index + 1),
				width: 0,
				height
			};
		};
	}
}