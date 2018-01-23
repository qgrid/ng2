import { isString } from '../utility';

export const key = newKey;
export const index = newIndex;
export const direction = newValue;
export const map = newMap;

export function orderFactory(model) {
	const sort = model.sort;
	return by => {
		const sortState = sort();
		if (sortState.trigger.indexOf('reorder') >= 0) {
			let index = 0;
			const indexMap = model.columnList().index
				.reduce((memo, key) => {
					memo[key] = index++;
					return memo;
				}, {});

			by.sort((x, y) => indexMap[key(x)] - indexMap[key(y)]);
		}

		return by;
	};
}

function newKey(pair) {
	let key = '';
	if (!isString(pair)) {
		key = Object.keys(pair)[0];
	} else {
		key = pair.split(/[+-]/)[1];
	}
	
	if(!key){
		throw new AppError(
			'pair',
			`Key is not defined in "${pair}"`);
	}

	return key;
}

function newValue(pair) {
	let value = '';
	if (!isString(pair)) {
		const pairKey = key(pair);
		value = pair[pairKey];
	} else {
		let delimiterSet = [{'desc':'-'}, {'asc':'+'}];
		let direction = pair.split(pair.split(/[+-]/)[1])[0];

		value = delimiterSet.map(obj => {
			return Object.keys(obj).map(key => {
				let value = obj[key];
				if (value === direction){
					return key;
				} else {
					return null;
				}
			}).reduce((p, k) => k, '');
		}).filter(v => v)
		.reduce((p, k) => k, '');
	}
	
	return value;
}

function newMap(pairs) {
	return pairs.reduce((memo, pair) => {
		const pairKey = key(pair);
		memo[pairKey] = newValue(pair);
		return memo;
	}, {});
}

function newIndex(pairs, pairKey) {
	return pairs.map(newKey).findIndex(k => k === pairKey);
}