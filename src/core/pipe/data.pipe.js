import { columnFactory } from '../column/column.factory';
import { generateFactory } from '../column-list/column.list.generate';

export function dataPipe(rows, context, next) {
	const { model } = context;

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { data: rows })
	});

	addDataRows(model, rows);
	addDataColumns(model);

	next(rows);

	model.pipe({
		effect: Object.assign({}, model.pipe().effect, { data: rows })
	}, {
			source: 'data.pipe',
			behavior: 'core'
		});
}

function addDataRows(model, rows) {
	model.data({ rows }, { source: 'data.pipe', behavior: 'core' });
}

function addDataColumns(model) {
	const getColumns = generateFactory(model);
	const createColumn = columnFactory(model);
	const result = getColumns();
	const columns = result.columns.map(columnBody => createColumn(columnBody.type, columnBody).model);

	if (result.hasChanges) {
		model.data({ columns }, { source: 'data.pipe', behavior: 'core' });
	}
}

