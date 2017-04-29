import Resource from 'core/resource/resource';
import Cache from 'core/infrastructure/cache';

export default class BodyModel {
	constructor() {
		this.resource = new Resource();
		this.cache = new Cache();
	}
}