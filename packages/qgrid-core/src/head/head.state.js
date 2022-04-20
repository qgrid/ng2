import { Cache } from '../infrastructure/cache';
import { Resource } from '../resource/resource';

export class HeadState {
	constructor() {
		this.resource = new Resource();
		this.cache = new Cache();
	}
}
