import { Resource } from '../resource/resource';

export class ValidationModel {
	constructor() {
		this.resource = new Resource();
		this.rules = [];
	}
}
