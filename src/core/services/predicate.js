import { isObject, yes, escapeRegexp } from '../utility/kit';
import { compileGet } from './path';

export function predicateFactory(search) {
	if (isObject(search)) {
		// TODO: improve performance
		const getters = Object
			.keys(search)
			.map(key => {
				const value = compileGet(key);
				return { key, value };
			});

		const { length } = getters;
		switch (length) {
			case 0: {
				return yes;
			}
			case 1: {
				const get = getters[0];
				const pattern = search[get.key];
				if (!pattern) {
					return yes;
				}

				const expr = new RegExp(pattern, 'gi');
				return item => expr.test(get.value(item));
			}
			default: {
				return item =>
					getters.reduce((memo, get) =>
						(memo && new RegExp(search[get.key], 'gi').test(get.value(item)) || search[get.key] === ''),
						true);

			}
		}
	}

	const pattern = escapeRegexp(search);
	const expr = new RegExp(pattern, 'gi');
	return item => {
		expr.lastIndex = 0;
		return expr.test(item);
	}
}