import Resource from '../resource/resource';
import Cache from 'core/infrastructure/cache';

export default class HeadModel {
	constructor() {
		this.resource = new Resource();
		this.cache = new Cache();
	}
}