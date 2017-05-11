import {EnumerableResource} from '../resource';
import {Cache} from '../infrastructure';

export class FootModel {
	constructor() {
		this.resource = new EnumerableResource();
		this.cache = new Cache();
	}
}