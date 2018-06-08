import { Resource } from '../resource/resource';

export class VisibilityModel {
	constructor() {
		this.resource = new Resource();
		this.head = true;
		this.foot = true;
		this.body = true;
		this.toolbar = {
			top: true,
			bottom: true,
			right: false,
			left: false
		};

		this.pin = {
			left: false,
			right: false,
			top: false,
			bottom: false
		};

		this.plugin = {};
	}
}
