import {Resource} from '../resource';
import {Cache} from '../infrastructure';

export class HeadModel {
	constructor() {
		this.resource = new Resource();
		this.cache = new Cache();
	}
}