import { AppError } from '../infrastructure/error';
import { orderBy } from '../utility/kit';
import { key as getKey, direction as getDirection } from '../sort/sort.service';
import { find } from '../column/column.service';
import { parseFactory } from '../services/convert';
import { Guard } from '../infrastructure/guard';

export function sortPipe(rows, context, next) {
	Guard.notNull(rows, 'rows');

	const { model } = context;

	let result = rows;
	if (rows.length) {
		const { by } = model.sort();
		if (by.length) {
			const columns = model.columnList().line;
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
				const compare = sortColumn.compare;

				mappings.push(row => {
					const value = getValue(row);
					const result = parseValue(value);
					return result === null ? value : result;
				});

				comparers.push(sortDir === 'asc' ? compare : (x, y) => -compare(x, y));
			}

			result = orderBy(rows, mappings, comparers);
		}
	}

	next(result);
}

