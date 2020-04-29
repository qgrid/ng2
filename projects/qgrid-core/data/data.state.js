import { PipeUnit } from '../pipe/pipe.unit';

export class DataState {
	constructor() {
		this.rows = [];
		this.columns = [];
		this.pipe = PipeUnit.default;

		this.id = {
			row: (index, row) => row,
			column: (index, column) => column.key
		};
	}
}