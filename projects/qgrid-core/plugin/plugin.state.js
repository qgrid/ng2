import { Resource } from '../resource/resource';

export class PluginState {
	constructor() {
		this.resource = new Resource();
		this.imports = {};
	}
}