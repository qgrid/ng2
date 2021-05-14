import { Guard } from '../infrastructure/guard';
import { yes } from '../utility/kit';

export function filterPipe(rows, context, next) {
	Guard.notNull(rows, 'rows');

	const { model } = context;

	let result = rows;
	if (rows.length) {
		const { match, customFilter } = model.filter();
		const matchPredicate = match(context);

		let test;
		if (matchPredicate !== yes && customFilter !== yes) {
			test = (row) => matchPredicate(row) && customFilter(row);
		} else if (matchPredicate !== yes) {
			test = (row) => matchPredicate(row);
		} else if (customFilter !== yes) {
			test = (row) => customFilter(row);
		}

		if (test) {
			result = [];
			for (let i = 0, length = rows.length; i < length; i++) {
				const row = rows[i];
				if (test(row)) {
					result.push(row);
				}
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