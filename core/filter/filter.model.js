import {Resource} from '../resource';
import {match} from './match';
import {noop} from '../services/utility';

export class FilterModel {
	constructor() {
		this.resource = new Resource();
		this.by = {};
		this.match = match;
		this.fetch = noop;
	}
}