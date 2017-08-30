import {Resource} from '../resource';

export class ProgressModel {
	constructor() {
		this.resource = new Resource();
		this.isBusy = false;
		this.queue = [];
	}
}
