import { Cell } from '../cell';
import { CellView } from '../../scene/view/cell.view';
import { AppError } from '../../infrastructure/error';

class VirtualCellView {
	constructor(selector) {
		this.selector = selector;

		this.rowIndex = 0;
		this.columnIndex = 0;
		this.row = null;
		this.column = null;
	}

	get model() {
		const model = this.selector();
		if (!model) {
			throw new AppError('cell', 'Model is not found');
		}

		return model;
	}

	mode(...args) {
		return this.model.mode(...args);
	}

	get value() {
		return this.model.value;
	}

	set value(value) {
		this.model.value = value;
	}
}

export class VirtualCell extends Cell {
	constructor(box, rowIndex, columnIndex, element = null) {
		super(box.context, rowIndex, columnIndex, element);

		this.box = box;

		const mapper = box.context.mapper;
		this.dataRowIndex = mapper.viewToRow(rowIndex);
		this.dataColumnIndex = mapper.viewToColumn(columnIndex);
	}

	model() {
		const rowIndex = this.dataRowIndex;
		const columnIndex = this.dataColumnIndex;

		if (rowIndex >= 0 && columnIndex >= 0) {
			const gridModel = this.box.model;
			const rows = gridModel.data().rows;
			const columns = gridModel.view().columns;

			if (rows.length > rowIndex && columns.length > columnIndex) {
				const selector = () => this.box.cell(rowIndex, columnIndex).modelCore();
				const viewModel = new VirtualCellView(selector);
				viewModel.rowIndex = rowIndex;
				viewModel.columnIndex = columnIndex;
				viewModel.row = rows[rowIndex];
				viewModel.column = columns[columnIndex];
				return new CellView(viewModel);
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