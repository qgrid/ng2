import {Resource} from '../resource';
import {match} from './match';
import {noop} from '../utility';

export class FilterModel {
	constructor() {
		this.resource = new Resource();
		this.by = {};
		this.match = match;
		this.fetch = noop;
		this.unit = 'default';	// default|row
	}
}