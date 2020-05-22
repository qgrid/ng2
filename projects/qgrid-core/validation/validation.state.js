import { Resource } from '../resource/resource';

export class ValidationState {
	constructor() {
		this.resource = new Resource();
		this.rules = [];
	}
}
