import { Cache } from '../infrastructure/cache';
import { Resource } from '../resource/resource';

export class BodyState {
	constructor() {
		this.resource = new Resource();
		this.cache = new Cache();
	}
}
