import { identity } from '../utility/kit';

export class ScrollModel {
	constructor() {
		this.mode = 'default';

		this.top = 0;
		this.left = 0;		
		this.cursor = 0;
		this.velocity = 10;
		this.offset = 50;

		this.map = {
			rowToView: identity,
			viewToRow: identity
		};

		this.resetTriggers = [
			'sort.view',
			'column.filter.view',
			'data.manipulation'
		];
	}
}