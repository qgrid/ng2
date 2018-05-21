import { AppError } from '../infrastructure/error';
import { orderBy } from '../utility/kit';
import { key as getKey, direction as getDirection } from '../sort/sort.service';
import { find } from '../column/column.service';
import { parseFactory } from '../services/convert';
import { Guard } from '../infrastructure/guard';

export function sortPipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const { model } = context;
	const { by } = model.sort();
	let result = memo;

	if (memo.length && by.length) {
		const columns = model.data().columns;
		const mappings = [];
		const comparers = [];

		for (let i = 0, length = by.length; i < length; i++) {
			const sortEntry = by[i];
			const sortKey = getKey(sortEntry);
			const sortDir = getDirection(sortEntry);
			const sortColumn = find(columns, sortKey);
			if (!sortColumn) {
				throw new AppError('sort.pipe', `Column "${sortKey}" is not found`);
			}

			const getValue = context.valueFactory(sortColumn);
			const parseValue = parseFactory(sortColumn.type, sortColumn.editor);

			mappings.push(row => parseValue(getValue(row)));
			const compare = sortColumn.compare;
			comparers.push(sortDir === 'asc' ? compare : (x, y) => -compare(x, y));
		}

		result = orderBy(memo, mappings, comparers);
	}

	next(result);
}

