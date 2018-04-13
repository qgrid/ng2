import {Resource} from '../../core/resource';
import {identity, cloneDeep, isArray, isObject, isDate, isBoolean, isNumber, isFunction} from '../../core/utility';

export class RestModel {
	constructor() {
		this.resource = new Resource();

		this.url = '';
		this.method = 'get';
		this.serialize = null;
		this.fetch = null;
	}
}
