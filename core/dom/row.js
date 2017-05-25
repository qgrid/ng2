import {Element} from './element';

export class Row extends Element {
	constructor(box, index, element = null) {
		super(element);

		this.box = box;
		this.index = index;
	}

	model() {
		const index = this.index;
		if (index >= 0) {
			const rows = this.box.gridModel.view().rows;
			if (index < rows.length) {
				return rows[index];
			}
		}

		return null;
	}

	cells() {
		return this.box.rowCellsCore(this.index);
	}

	cell(columnIndex) {
		return this.box.cell(this.index, columnIndex);
	}

	addClass(name) {
		const model = this.model;
		if (model) {
			this.context.styleStorage.addRowClass(name, model.index);
		}

		super.addClass(name);
	}

	removeClass(name) {
		const model = this.model;
		if (model) {
			this.context.styleStorage.removeRowClass(name, model.index);
		}

		super.removeClass(name);
	}
}