import {AppError} from '../infrastructure';
import {orderBy} from '../utility';
import {key as getKey, direction as getDirection} from '../sort/sort.service';
import {find} from '../column/column.service';
import {parseFactory} from '../services';

export function sortPipe(data, context, next) {
	const model = context.model;
	const by = model.sort().by;
	let result = data;

	if (data.length && by.length) {
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
			const parseValue = parseFactory(sortColumn.type);

			mappings.push(row => parseValue(getValue(row)));
			const compare = sortColumn.compare;
			comparers.push(sortDir === 'asc' ? compare : (x, y) => -compare(x, y));
		}

		result = orderBy(data, mappings, comparers);
	}

	next(result);
}

