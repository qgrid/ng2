import { isString } from '../utility/kit';
import { AppError } from '../infrastructure/error';

export const key = getKey;
export const index = getIndex;
export const direction = getValue;
export const map = getMap;

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

			by.sort((x, y) => indexMap[getKey(x)] - indexMap[getKey(y)]);
		}

		return by;
	};
}

function getKey(pair) {
	let key = Object.keys(pair)[0];

	if (isString(pair)) {
		key = pair.split(/[+-]/)[1];
	}

	if (!key) {
		throw new AppError(
			'sort.service',
			`Key is not defined in "${pair}"`);
	}

	return key;
}

function getValue(pair) {
	if (!isString(pair)) {
		const pairKey = getKey(pair);
		return pair[pairKey];
	} else {
		const delimiterSet = [{ 'desc': '-' }, { 'asc': '+' }];
		const direction = pair.split(pair.split(/[+-]/)[1])[0];

		return delimiterSet.map(obj => {
			return Object.keys(obj).map(key => {
				let value = obj[key];
				if (value === direction) {
					return key;
				} else {
					return null;
				}
			}).reduce((p, k) => k, '');
		}).filter(v => v)
			.reduce((p, k) => k, '');
	}
}

function getMap(pairs) {
	return pairs.reduce((memo, pair) => {
		const pairKey = getKey(pair);
		memo[pairKey] = getValue(pair);
		return memo;
	}, {});
}

function getIndex(pairs, pairKey) {
	return pairs.map(getKey).findIndex(k => k === pairKey);
}