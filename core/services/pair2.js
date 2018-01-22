import { isString, isObject } from '../utility';
import {AppError} from '../infrastructure';

export function key(pair) {
	let key = "";
	if (isObject(pair) && !isString(pair)) {
		key = Object.keys(pair)[0];
	} else if (isString(pair)) {
		key = pair.split(/[+-]/)[1];
	}
	
	if(!key){
		throw new AppError(
			'pair',
			`Key is not defined in "${pair}"`);
	}

	return key;
}

export function index(pairs, pairKey) {
	return pairs.map(key).findIndex(k => k === pairKey);
}

export function value(pair) {
	let value = "";
	if (isObject(pair) && !isString(pair)) {
		const pairKey = key(pair);
		value = pair[pairKey];
	} else if (isString(pair)) {
		let delimiterSet = [{'desc':'-'}, {'asc':'+'}];
		let delimeter = pair.split(pair.split(/[+-]/)[1])[0];

		value = delimiterSet.map(obj => {
			return Object.keys(obj).map(key => {
				let value = obj[key];
				if (value === delimeter){
					return key;
				} else {
					return null;
				}
			}).reduce((p, k) => k, "");
		}).filter(v => v)
		.reduce((p, k) => k, "");
	}
	
	return value;
}

export function map(pairs) {
	return pairs.reduce((memo, pair) => {
		const pairKey = key(pair);
		memo[pairKey] = value(pair);
		return memo;
	}, {});
}

