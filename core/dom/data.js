import * as columnService from '../column/column.service';

export class Data {
	constructor(model) {
		this.model = model;
	}

	columns() {
		const columns = this.model.view().columns;
		return columnService
			.lineView(columns)
			.map(v => v.model);
	}

	columnMap() {
		return columnService.map(this.columns());
	}

	rows() {
		return this.model.view().rows;
	}
}