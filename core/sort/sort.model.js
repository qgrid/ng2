import {Resource} from '../resource';
import { isString } from '../utility';

export class SortModel {
	constructor() {
		this.resource = new Resource();
		this.by = [];
		this.mode = 'multiple';
		this.trigger = ['reorder'];
	}

	tryToResolveSortFormat() {
		let self = this;
		let delimitersSet = [{'desc':'-'}, {'asc':'+'}];
		let delimeters = delimitersSet.map(delimeter => {
			return Object.keys(delimeter).map(key => delimeter[key]).reduce((p, k) => k, "");
		});
		
		this.by = this.by.map(sortKey => {
			if (isString(sortKey)) {
				let delimeter = delimeters.filter(key => sortKey.indexOf(key) > -1).reduce((p, k) => k, "");
				if (delimeter) {
					let columnName = sortKey.split(delimeter)[1];
					let delimeterValue = delimitersSet.map(d => {
						return Object.keys(d).map(key => {
							let value = d[key];
							if (value === delimeter){
								return key;
							} else {
								return null;
							}
						}).reduce((p, k) => k, "");
					});
					let result = {};
					result[columnName] = delimeterValue.filter(v => v).reduce((p, k)=> k);
					return result;
				}
			} else {
				return sortKey;
			}
		});
		
		return self;
	}
}