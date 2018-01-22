import {Resource} from '../resource';
import { isString, isObject } from '../utility';

export class SortModel {
	constructor() {
		this.resource = new Resource();
		this.by = [];
		this.mode = 'multiple';
		this.trigger = ['reorder'];
	}
}