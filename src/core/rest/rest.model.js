import { serialize } from './get.serialize';

export class RestModel {
	constructor() {
		this.url = '';
		this.method = 'get';
		this.serialize = serialize;
	}
}
