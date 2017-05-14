import {Resource} from '@grid/core/resource';

export default class PluginModel {
	constructor() {
		this.resource = new Resource();
		this.items = new Set();
	}
}