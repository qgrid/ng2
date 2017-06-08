import {RowDetails} from './row.details';
import {RowDetailsStatus} from './row.details.status';
import {AppError} from '../infrastructure';
import {columnFactory} from '../column/column.factory';

export function flatView(table) {
	const result = [];
	const model = table.model;
	const createColumn = columnFactory(model);
	const colspan = table.data.columns().length;
	const rows = model.view().rows;
	const status = model.row().status;

	rows.forEach(row => {
		if (!(row instanceof RowDetails)) {
			const state = status.get(row);
			result.push(row);
			if (state && state instanceof RowDetailsStatus) {
				if (state.expand) {
					const column = createColumn('row-details');
					result.push(new RowDetails(row, column));
					column.colspan = colspan;
				}
			}
		}
	});

	return result;
}

export function toggleStatus(rows, status, mode = 'single') {
	switch (mode) {
		case 'single':
			status = new Map(Array.from(status.entries()).filter(entry => {
				const row = entry[0];
				const status = entry[1];
				return rows.indexOf(row) >= 0 || !(status instanceof RowDetailsStatus);
			}));
			break;
		case 'multiple':
			status = new Map(status.entries());
			break;
		default:
			throw AppError('row.details.service', `Invalid mode ${mode}`);
	}

	rows.forEach(row => {
		const state = status.get(row);
		if (!state) {
			status.set(row, new RowDetailsStatus(true));
		} else {
			state.expand = !state.expand;
		}
	});

	return status;
}