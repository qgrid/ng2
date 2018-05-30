import { Guard } from '../infrastructure/guard';

export function filterPipe(data, context, next) {
	Guard.notNull(data, 'data');

	const result = [];
	if (data.length) {
		const { model } = context;
		const filterState = model.filter();
		const test = filterState.match(context);

		for (let i = 0, length = data.length; i < length; i++) {
			const item = data[i];
			if (test(item)) {
				result.push(item);
			}
		}
	}

	next(result);
}