import {Resource} from '../resource';
import {Cache} from '../infrastructure';

export class BodyModel {
	constructor() {
		this.resource = new Resource();
		this.cache = new Cache();
	}
}