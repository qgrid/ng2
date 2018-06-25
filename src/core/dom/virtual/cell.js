import { Cell } from '../cell';
import { Td } from '../td';
import { AppError } from '../../infrastructure/error';

class VirtualTd {
	constructor(selector) {
		this.selector = selector;

		this.rowIndex = 0;
		this.columnIndex = 0;
		this.row = null;
		this.column = null;
	}

	get model() {
		const td = this.selector();
		if (!td) {
			throw new AppError('cell', 'Model is not found');
		}

		return td;
	}

	mode(value) {
		return this.model.mode(value);
	}

	get value() {
		return this.model.value;
	}

	set value(value) {
		this.model.value = value;
	}

	get label() {
		return this.model.value;
	}

	set label(value) {
		this.model.value = value;
	}
}

export class VirtualCell extends Cell {
	constructor(box, rowIndex, columnIndex, element = null) {
		super(box.context, rowIndex, columnIndex, element);

		this.box = box;

		const { mapper } = box.context;
		this.dataRowIndex = mapper.viewToRow(rowIndex);
		this.dataColumnIndex = mapper.viewToColumn(columnIndex);
	}

	model() {
		const rowIndex = this.dataRowIndex;
		const columnIndex = this.dataColumnIndex;

		if (rowIndex >= 0 && columnIndex >= 0) {
			const gridModel = this.box.model;
			const { rows } = gridModel.data();
			const { columns } = gridModel.view();

			if (rows.length > rowIndex && columns.length > columnIndex) {
				const selector = () => this.box.cell(rowIndex, columnIndex).modelCore();
				const td = new VirtualTd(selector);
				td.rowIndex = rowIndex;
				td.columnIndex = columnIndex;
				td.row = rows[rowIndex];
				td.column = columns[columnIndex];
				return new Td(td);
			}
		}

		return null;
	}

	addClass(name, force = false) {
		this.box.addCellClass(this, name, force);
	}

	removeClass(name, force = false) {
		this.box.removeCellClass(this, name, force);
	}
}