import AppError from '../infrastructure/error';
import {orderBy} from '../services/utility';
import {key as getKey, direction as getDirection} from '../sort/sort.service';
import {find} from '../column/column.service';

export default function pipeSort(data, context, next) {
	const model = context.model;
	const by = model.sort().by;
	let result = data;

	if (by.length) {
		const columns = model.data().columns;
		const mappings = [];
		const directions = [];

		for (let i = 0, length = by.length; i < length; i++) {
			const sortEntry = by[i];
			const	sortKey = getKey(sortEntry);
			const	sortDir = getDirection(sortEntry);
			const	sortColumn = find(columns, sortKey);
			if (!sortColumn) {
				throw new AppError('sort.pipe', `Column "${sortKey}" is not found`);
			}

			mappings.push(context.valueFactory(sortColumn));
			directions.push(sortDir);
		}

		result = orderBy(data, mappings, directions);
	}

	next(result);
}

