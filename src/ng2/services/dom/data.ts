import * as columnService from 'core/column/column.service';

export class Data {
	constructor(private model, private pin) {
	}

	columns() {
		const columns = this.model.view().columns;
		return columnService
			.lineView(columns)
			.map(v => v.model)
			.filter(c => c.pin === this.pin);
	}

	columnMap() {
		return columnService.map(this.columns());
	}

	rows() {
		return this.model.view().rows;
	}
}
