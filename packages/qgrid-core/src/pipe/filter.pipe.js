import { Guard } from '../infrastructure/guard';
import { yes } from '../utility/kit';

export function filterPipe(rows, context, next) {
	Guard.notNull(rows, 'rows');

	const { model } = context;

	let result = rows;
	if (rows.length) {
		const { match, custom } = model.filter();
		const matchPredicate = match(context);

		let test;
		if (matchPredicate !== yes && custom !== yes) {
			test = (row) => matchPredicate(row) && custom(row);
		} else if (matchPredicate !== yes) {
			test = (row) => matchPredicate(row);
		} else if (custom !== yes) {
			test = (row) => custom(row);
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