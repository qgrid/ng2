import PipeUnit from 'core/pipe/units/pipe.unit';

export default class DataModel {
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