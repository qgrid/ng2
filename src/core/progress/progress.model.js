import Resource from '../resource/resource';

export default class ProgressModel {
	constructor() {
		this.resource = new Resource();
		this.isBusy = false;
		this.queue = [];
	}
}
