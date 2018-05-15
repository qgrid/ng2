import { Resource } from '../../core/resource';
import { serialize } from './get.serialize';

export class RestModel {
	constructor() {
		this.resource = new Resource();

		this.url = '';
		this.method = 'get';
		this.serialize = serialize;
	}
}
