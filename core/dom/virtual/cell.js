import {Cell} from '../cell';
import * as columnService from '../../column/column.service';
import {Cell as CellModel} from '../../cell';

export class VirtualCell extends Cell {
	constructor(box, rowIndex, columnIndex, element = null) {
		super(box.context, rowIndex, columnIndex, element);

		this.box = box;

		const mapper = box.context.mapper;
		this.dataRowIndex = mapper.viewToRow(rowIndex);
		this.dataColumnIndex = mapper.viewToColumn(columnIndex);
	}

	get model() {
		const rowIndex = this.dataRowIndex;
		const columnIndex = this.dataColumnIndex;
		if (rowIndex >= 0 && columnIndex >= 0) {
			const gridModel = this.box.model;
			const rows = gridModel.data().rows;
			const columns = columnService
				.lineView(gridModel.view().columns)
				.map(v => v.model);

			if (rows.length > rowIndex && columns.length > columnIndex) {
				const model = {
					rowIndex: rowIndex,
					columnIndex: columnIndex,
					row: rows[rowIndex],
					column: columns[columnIndex]
				};

				return new CellModel(model);
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
