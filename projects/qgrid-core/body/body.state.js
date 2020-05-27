import { Resource } from '../resource/resource';
import { Cache } from '../infrastructure/cache';

export class BodyState {
	constructor() {
		this.resource = new Resource();
		this.cache = new Cache();
	}
}