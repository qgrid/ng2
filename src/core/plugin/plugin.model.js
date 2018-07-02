import { Resource } from '../resource/resource';

export class PluginModel {
	constructor() {
		this.resource = new Resource();
		this.imports = {};
	}
}