import { isString } from '../utility/kit';
import { AppError } from '../infrastructure/error';
import { preOrderDFS } from '../node/node.service';

export const key = getKey;
export const index = getIndex;
export const direction = getDirection;
export const map = getMap;

export function orderFactory(model) {
	const { sort } = model;
	return by => {
		const { trigger } = sort();
		if (trigger.indexOf('reorder') >= 0) {
			let index = 0;
			const indexMap = {};
			preOrderDFS(model.columnList().index.children, node => {
				const { key } = node.key.model;
				indexMap[key] = index++;
			});

			by.sort((x, y) => indexMap[getKey(x)] - indexMap[getKey(y)]);
		}

		return by;
	};
}

function getKey(pair) {
	let key;
	if (isString(pair)) {
		const signedKey = pair.split(/[+-]/);
		key = signedKey[1] || signedKey[0];
	} else {
		key = Object.keys(pair)[0]
	}

	if (!key) {
		throw new AppError(
			'sort.service',
			`Key is not defined in "${pair}"`);
	}

	return key;
}

function getDirection(pair) {
	if (isString(pair)) {
		const directions = { '-': 'desc', '+': 'asc' };
		return directions[pair[0]] || 'asc';
	}

	const pairKey = getKey(pair);
	return pair[pairKey];
}

function getMap(pairs) {
	return pairs.reduce((memo, pair) => {
		const key = getKey(pair);
		memo[key] = getDirection(pair);
		return memo;
	}, {});
}

function getIndex(pairs, key) {
	return pairs.map(getKey).findIndex(pairKey => pairKey === key);
}