import { PipeUnit } from '../pipe/pipe.unit';

export class DataModel {
	constructor() {
		this.rows = [];
		this.columns = [];
		this.pipe = PipeUnit.default;

		this.isReadonly = false;

		this.id = {
			row: (index, row) => index,
			column: (index, column) => column.model.key
		};
	}
}