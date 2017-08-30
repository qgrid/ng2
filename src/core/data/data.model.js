import {PipeUnit} from '../pipe/pipe.unit';

export class DataModel {
	constructor() {
		this.rows = [];
		this.columns = [];
		this.pipe = PipeUnit.default;
		this.triggers = {
			'data': ['rows'],
			'pagination': ['current', 'size'],
			'sort': ['by'],
			'filter': ['by'],
			'group': ['by'],
			'pivot': ['by']
		};
	}
}