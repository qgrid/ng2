import {Resource} from '../resource';

export class PluginModel {
	constructor() {
		this.resource = new Resource();
		this.imports = {};
	}
}