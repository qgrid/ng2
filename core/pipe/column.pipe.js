import {columnFactory} from '../column/column.factory';
import * as columnService from '../column/column.service';
import {noop} from '../utility';
import {generateFactory, sortIndexFactory} from '../column-list';

export function columnPipe(memo, context, next) {
	const model = context.model;
	const pivot = memo.pivot;
	const nodes = memo.nodes;
	const heads = pivot.heads;
	const dataColumns = [];
	const addDataColumns = dataColumnsFactory(model);

	/*
	 * We need to invoke addDataColumns earlier that others because it setups data.columns model property
	 *
	 */
	addDataColumns(dataColumns, {rowspan: heads.length, row: 0});

	const addSelectColumn = selectColumnFactory(model);
	const addGroupColumn = groupColumnFactory(model, nodes);
	const addExpandColumn = expandColumnFactory(model);
	const addPivotColumns = pivotColumnsFactory(model);
	const addPadColumn = padColumnFactory(model);
	const columns = [];

	/*
	 * Add column with select boxes
	 * if selection unit is row
	 *
	 */
	addSelectColumn(columns, {rowspan: heads.length, row: 0});

	/*
	 * Add group column with nodes
	 *
	 */
	addGroupColumn(columns, {rowspan: heads.length, row: 0});

	/*
	 * Add row expand column
	 */
	addExpandColumn(columns, {rowspan: heads.length, row: 0});

	columns.forEach((c, i) => c.index = i);

	/*
	 *Add columns defined by user
	 * that are visible
	 *
	 */
	columns.push(...dataColumns);

	/*
	 * Persist order of draggable columns
	 *
	 */
	let index = 0;
	const columnMap = columnService.map(columns.map(c => c.model));
	const indexMap = model
		.columnList()
		.index
		.filter(key => columnMap.hasOwnProperty(key))
		.reduce((memo, key) => {
			memo[key] = index++;
			return memo;
		}, {});

	const notIndexedColumns = columns.filter(c => !indexMap.hasOwnProperty(c.model.key));
	const indexedColumns = columns.filter(c => indexMap.hasOwnProperty(c.model.key));
	const startIndex = notIndexedColumns.length;

	notIndexedColumns.forEach((c, i) => c.model.index = i);
	indexedColumns.forEach(c => c.model.index = startIndex + indexMap[c.model.key]);

	columns.sort((x, y) => x.model.index - y.model.index);

	if (heads.length) {
		/*
		 * Add column rows for pivoted data
		 * if pivot is turned on
		 *
		 */

		memo.columns = addPivotColumns(columns, heads);
	}
	else {
		/*
		 * Add special column type
		 * that fills remaining place (width = 100%)
		 *
		 */
		addPadColumn(columns, {rowspan: heads.length, row: 0});
		memo.columns = [columns];
	}

	next(memo);
}

function selectColumnFactory(model) {
	const dataColumns = model.data().columns;
	const selection = model.selection();

	const selectColumn = dataColumns.find(item => item.type === 'select');
	const indicatorColumn = dataColumns.find(item => item.type === 'row-indicator');

	if (!indicatorColumn && selection.unit === 'mix') {
		const createColumn = columnFactory(model);
		return (columns, context) => {
			const indicatorColumn = createColumn('row-indicator');
			indicatorColumn.model.source = 'generation';
			indicatorColumn.rowspan = context.rowspan;
			if (indicatorColumn.model.isVisible) {
				columns.push(indicatorColumn);
				return indicatorColumn;
			}
		};
	}

	if (!selectColumn && selection.unit === 'row' && selection.mode !== 'range') {
		const createColumn = columnFactory(model);
		return (columns, context) => {
			const selectColumn = createColumn('select');
			selectColumn.model.source = 'generation';
			selectColumn.rowspan = context.rowspan;
			if (selectColumn.model.isVisible) {
				columns.push(selectColumn);
				return selectColumn;
			}
		};
	}

	return noop;
}

function groupColumnFactory(model, nodes) {
	const dataColumns = model.data().columns;
	const groupColumn = dataColumns.find(item => item.type === 'group');
	if (nodes.length && !groupColumn) {
		const createColumn = columnFactory(model);
		return (columns, context) => {
			const groupColumn = createColumn('group');
			groupColumn.model.source = 'generation';
			groupColumn.rowspan = context.rowspan;
			if (groupColumn.model.isVisible) {
				columns.push(groupColumn);
				return groupColumn;
			}
		};
	}

	return noop;
}

function expandColumnFactory(model) {
	const dataColumns = model.data().columns;
	const expandColumn = dataColumns.find(item => item.type === 'row-expand');
	if (model.row().unit === 'details' && !expandColumn) {
		const createColumn = columnFactory(model);
		return (columns, context) => {
			const expandColumn = createColumn('row-expand');
			expandColumn.model.source = 'generation';
			expandColumn.rowspan = context.rowspan;
			if (expandColumn.model.isVisible) {
				columns.push(expandColumn);
				return expandColumn;
			}
		};
	}

	return noop;
}

function dataColumnsFactory(model) {
	const getColumns = generateFactory(model);
	const getIndex = sortIndexFactory(model);
	const createColumn = columnFactory(model);
	return (columns, context) => {
		const result = getColumns();
		if (result.hasChanges) {
			model.data({
				columns: result.columns
			}, {
				source: 'column.pipe',
				behavior: 'core'
			});
		}

		columns.push(...
			columnService.dataView(
				result.columns
					.map(columnBody => {
						const dataColumn = createColumn(columnBody.type || 'text', columnBody);
						dataColumn.rowspan = context.rowspan;
						return dataColumn;
					}),
				model));


		const indexResult = getIndex(columns.map(column => column.model));
		if (indexResult.hasChanges) {
			model.columnList({
				index: indexResult.index
			}, {
				source: 'column.pipe',
				behavior: 'core'
			});
		}

		return result.columns;
	};
}

function padColumnFactory(model) {
	const createColumn = columnFactory(model);
	return (columns, context) => {
		const padColumn = createColumn('pad');
		padColumn.rowspan = context.rowspan;
		columns.push(padColumn);
		return padColumn;
	};
}

function pivotColumnsFactory(model) {
	const createColumn = columnFactory(model);
	const addPadColumn = padColumnFactory(model);
	return (columns, heads) => {
		const rows = [columns];

		/*
		 * Data columns + first row pivot columns
		 *
		 */
		const head = heads[0];
		const headLength = head.length;
		const row = new Array(headLength);
		const startIndex = columns.length;
		for (let j = 0; j < headLength; j++) {
			const headColumn = head[j];
			const pivotColumn = createColumn('pivot');
			pivotColumn.colspan = headColumn.value;
			const pivotColumnModel = pivotColumn.model;
			pivotColumnModel.title = headColumn.key;
			pivotColumnModel.key = pivotColumnModel.key + `[0][${j}]`;

			pivotColumnModel.rowIndex = 0;
			pivotColumnModel.index = startIndex + j;
			row[j] = pivotColumn;
		}

		const firstRow = rows[0];
		firstRow.push(...row);

		/*
		 * Add special column type
		 * that fills remaining place (width = 100%)
		 *
		 */
		addPadColumn(firstRow, {rowspan: 1, row: 0});

		/*
		 * Next rows pivot columns
		 *
		 */
		for (let i = 1, length = heads.length; i < length; i++) {
			const head = heads[i];
			const headLength = head.length;
			const row = new Array(headLength);
			for (let j = 0; j < headLength; j++) {
				const headColumn = head[j];
				const pivotColumn = createColumn('pivot');
				pivotColumn.colspan = headColumn.value;
				const pivotColumnModel = pivotColumn.model;
				pivotColumnModel.title = headColumn.key;
				pivotColumnModel.key = pivotColumnModel.key + `[${i}][${j}]`;

				pivotColumnModel.rowIndex = i;
				pivotColumnModel.index = j;
				row[j] = pivotColumn;
			}

			/*
			 * Add special column type
			 * that fills remaining place (width = 100%)
			 *
			 */
			addPadColumn(row, {rowspan: 1, row: i});

			rows.push(row);
		}

		return rows;
	};
}