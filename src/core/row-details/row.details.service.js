import { RowDetails } from './row.details';
import { RowDetailsStatus } from './row.details.status';
import { AppError } from '../infrastructure/error';
import { columnFactory } from '../column/column.factory';

export function flatView(model, mode) {
	const result = [];
	const createColumn = columnFactory(model);
	const rows = model.view().rows;
	const status = model.row().status;
	const showAll = mode === 'all';
	const columns = model.scene().column.line;
	const expandColumn = columns.find(c => c.model.type === 'row-expand');
	const columnIndex = expandColumn ? expandColumn.index : 0;
	rows.forEach(row => {
		if (!(row instanceof RowDetails)) {
			result.push(row);
			const state = status.get(row) || (showAll && new RowDetailsStatus(true));
			if (state && state instanceof RowDetailsStatus) {
				if (state.expand) {
					const column = createColumn('row-details');
					column.index = columnIndex;
					result.push(new RowDetails(row, column));
				}
			}
		}
	});

	return result;
}

export function invalidateStatus(rows, status, mode) {
	switch (mode) {
		case 'all':
			status = new Map(status.entries());
			rows.forEach(row => {
				if (!status.has(row)) {
					status.set(row, new RowDetailsStatus(true));
				}
			});
			break;
		case 'single':
			status = new Map(Array
				.from(status.entries())
				.filter(entry => {
					const row = entry[0];
					const status = entry[1];
					return rows.indexOf(row) >= 0 || !(status instanceof RowDetailsStatus);
				}));
			break;
		case 'multiple':
			status = new Map(status.entries());
			break;
		default:
			throw new AppError('row.details.service', `Invalid mode ${mode}`);
	}

	return status;
}

export function toggleStatus(rows, status, mode = 'single') {
	status = invalidateStatus(rows, status, mode);
	if (mode !== 'all') {
		rows.forEach(row => {
			const state = status.get(row);
			if (!state) {
				status.set(row, new RowDetailsStatus(true));
			} else {
				state.expand = !state.expand;
			}
		});
	}

	return status;
}