import * as pair from '../services/pair';

export const key = pair.key;
export const index = pair.index;
export const direction = pair.value;
export const map = pair.map;

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