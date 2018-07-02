import { Guard } from '../infrastructure/guard';

export function filterPipe(rows, context, next) {
	Guard.notNull(rows, 'rows');

	const { model } = context;

	const result = [];
	if (rows.length) {
		const filterState = model.filter();
		const test = filterState.match(context);

		for (let i = 0, length = rows.length; i < length; i++) {
			const row = rows[i];
			if (test(row)) {
				result.push(row);
			}
		}
	}

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { filter: result })
	}, {
			source: 'filter.pipe',
			behavior: 'core'
		});

	next(result);
}