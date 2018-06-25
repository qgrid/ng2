import { Row } from '../row';

export class VirtualRow extends Row {
	constructor(box, index, element = null) {
		super(box, index, element);

		const { mapper } = box.context;
		this.dataIndex = mapper.viewToRow(index);
	}

	model() {
		const model = super.model();
		if (model) {
			return model;
		}

		const index = this.dataIndex;
		if (index >= 0) {
			const gridModel = this.box.model;
			const { rows } = gridModel.data();
			if (rows.length > index) {
				return rows[index];
			}
		}

		return null;
	}

	cells() {
		return this.box.rowCellsCore(this.dataIndex);
	}

	cell(columnIndex) {
		return this.box.cellCore(this.dataIndex, columnIndex);
	}

	addClass(name, force = false) {
		this.box.addRowClass(this, name, force);
	}

	removeClass(name, force = false) {
		this.box.removeRowClass(this, name, force);
	}
}
