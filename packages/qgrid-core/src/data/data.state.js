import { PipeUnit } from '../pipe/pipe.unit';

export class DataState {
	constructor() {
		this.rows = [];
		this.columns = [];
		this.pipe = PipeUnit.default;

		this.rowId = (index, row) => row;
		this.columnId = (index, column) => column.key;
	}
}