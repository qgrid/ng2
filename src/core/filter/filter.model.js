import { Resource } from '../resource/resource';
import { match } from './match';
import { noop } from '../utility/kit';

export class FilterModel {
	constructor() {
		this.resource = new Resource();

		this.by = {};
		this.match = match;
		this.fetch = noop;
		this.unit = 'default';	// default|row
		this.assertFactory = () => ({
			equals: (x, y) => x === y,
			lessThan: (x, y) => x < y,
			isNull: x => x === '' || x === null || x === undefined
		});
	}
}