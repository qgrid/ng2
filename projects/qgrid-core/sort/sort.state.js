import { Resource } from '../resource/resource';

export class SortState {
	constructor() {
		this.resource = new Resource();
		this.by = [];
		this.mode = 'multiple';
		this.trigger = ['reorder'];
	}
}