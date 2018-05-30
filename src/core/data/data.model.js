import {PipeUnit} from '../pipe/pipe.unit';

export class DataModel {
	constructor() {
		this.rows = [];
		this.columns = [];
		this.pipe = PipeUnit.default;
	}
}     