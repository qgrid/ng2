import { Resource } from '../resource/resource';

export class ProgressModel {
	constructor() {
		this.resource = new Resource();
		this.isBusy = false;
		this.queue = [];
	}
}
