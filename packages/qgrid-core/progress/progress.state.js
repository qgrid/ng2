import { Resource } from '../resource/resource';

export class ProgressState {
	constructor() {
		this.resource = new Resource();
		this.isBusy = false;
		this.queue = [];
	}
}
