import { RowDetails } from './row.details';
import { RowDetailsStatus } from './row.details.status';
import { AppError } from '../infrastructure/error';
import { columnFactory } from '../column/column.factory';

export function flatView(model, mode) {
	const { rows } = model.view();
	const { status } = model.row();
	const { line } = model.scene().column;

	const showAll = mode === 'all';
	const expandColumn = line.find(c => c.model.type === 'row-expand');
	const columnIndex = expandColumn ? expandColumn.columnIndex : 0;

	const result = [];
	const createColumn = columnFactory(model);
	for (let i = 0, length = rows.length; i < length; i++) {
		const dataRow = rows[i];
		result.push(dataRow);

		const nextRow = rows[i + 1];
		const detailsRow = nextRow instanceof RowDetails ? nextRow : null;
		const state = status.get(dataRow) || (showAll && new RowDetailsStatus(true));
		if (state instanceof RowDetailsStatus && state.expand) {
			if (detailsRow) {
				result.push(detailsRow);
				i++;
			} else {
				const column = createColumn('row-details');
				column.columnIndex = columnIndex;
				result.push(new RowDetails(dataRow, column));
			}
			continue;
		}

		if (detailsRow) {
			i++;
		}
	}

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