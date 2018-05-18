import { AppError } from '../infrastructure/error';

export function key(pair) {
	const key = Object.keys(pair)[0];
	if (!key) {
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
	const pairKey = key(pair);
	return pair[pairKey];
}

export function map(pairs) {
	return pairs.reduce((memo, pair) => {
		const pairKey = key(pair);
		memo[pairKey] = pair[pairKey];
		return memo;
	}, {});
}

