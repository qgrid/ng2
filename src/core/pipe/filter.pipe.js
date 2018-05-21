import { Guard } from '../infrastructure/guard';

export function filterPipe(data, context, next) {
	Guard.notNull(memo, 'memo');

	const result = [];
	if (memo.length) {
		const { model } = context;
		const filterState = model.filter();
		const test = filterState.match(context);

		for (let i = 0, length = memo.length; i < length; i++) {
			const item = memo[i];
			if (test(item)) {
				result.push(item);
			}
		}
	}

	next(result);
}