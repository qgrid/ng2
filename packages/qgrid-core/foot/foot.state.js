import { EnumerableResource } from '../resource/resource.enumerable';
import { Cache } from '../infrastructure/cache';

export class FootState {
	constructor() {
		this.resource = new EnumerableResource();
		this.cache = new Cache();
	}
}