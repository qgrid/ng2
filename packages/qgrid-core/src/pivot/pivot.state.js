import { Resource } from '../resource/resource';

export class PivotState {
	constructor() {
		this.resource = new Resource();
		this.by = [];
	}
}