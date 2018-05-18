import { Resource } from '../resource/resource';
import { Cache } from '../infrastructure/cache';

export class HeadModel {
	constructor() {
		this.resource = new Resource();
		this.cache = new Cache();
	}
}