import * as columnService from '../column/column.service';

export class Data {
	constructor(model) {
		this.model = model;
	}

	columns() {
		return this.model.view().columns;
	}

	columnMap() {
		return columnService.map(this.columns());
	}

	rows() {
		return this.model.view().rows;
	}
}