import { columnFactory } from '../column/column.factory';
import * as columnService from '../column/column.service';
import { noop } from '../utility/kit';
import { generateFactory } from '../column-list/column.list.generate';
import { sortIndexFactory } from '../column-list/column.list.sort';
import { Guard } from '../infrastructure/guard';

export function columnPipe(memo, context, next) {
	Guard.hasProperty(memo, 'pivot');
	Guard.hasProperty(memo, 'nodes');

	const { model } = context;
	const { pivot, nodes } = memo;
	const { heads } = pivot;
	const dataColumns = [];
	const addDataColumns = dataColumnsFactory(model);
	const rowspan = Math.max(1, heads.length);

	/*
	 * We need to invoke addDataColumns earlier that others because it setups data.columns model property
	 *
	 */
	addDataColumns(dataColumns, { rowspan: rowspan, row: 0 });

	const addSelectColumn = selectColumnFactory(model);
	const addGroupColumn = groupColumnFactory(model, nodes);
	const addRowExpandColumn = rowExpandColumnFactory(model);
	const addRowIndicatorColumn = rowIndicatorColumnFactory(model);
	const addPivotColumns = pivotColumnsFactory(model);
	const addPadColumn = padColumnFactory(model);
	const columns = [];

	/*
	 * Add row indicator column
	 * if rows are draggable or resizable
	 *
	 */
	addRowIndicatorColumn(columns, { rowspan: rowspan, row: 0 });

	/*
	 * Add column with select boxes
	 * if selection unit is row
	 *
	 */
	addSelectColumn(columns, { rowspan: rowspan, row: 0 });

	/*
	 * Add group column with nodes
	 *
	 */
	addGroupColumn(columns, { rowspan: rowspan, row: 0 });

	/*
	 * Add row expand column
	 */
	addRowExpandColumn(columns, { rowspan: rowspan, row: 0 });

	/*
	 *Add columns defined by user
	 * that are visible
	 *
	 */
	columns.push(...dataColumns);

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
		addPadColumn(columns, { rowspan: rowspan, row: 0 });
		memo.columns = [columns];
	}

	memo.columns = index(filter(model, sort(model, memo.columns)));
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
	const groupState = model.group();
	if (!groupColumn && groupState.mode != 'subhead' && (nodes.length || groupState.by.length)) {
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

function rowExpandColumnFactory(model) {
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

function rowIndicatorColumnFactory(model) {
	const dataColumns = model.data().columns;
	const rowIndicatorColumn = dataColumns.find(item => item.type === 'row-indicator');
	const rowState = model.row();
	if ((rowState.canMove || rowState.canResize) && !rowIndicatorColumn) {
		const createColumn = columnFactory(model);
		return (columns, context) => {
			const expandColumn = createColumn('row-indicator');
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
			result.columns
				.map(columnBody => {
					const dataColumn = createColumn(columnBody.type || 'text', columnBody);
					dataColumn.rowspan = context.rowspan;
					return dataColumn;
				}));

		return result.columns;
	};
}

function padColumnFactory(model) {
	const createColumn = columnFactory(model);
	return (columns, context) => {
		const padColumn = createColumn('pad');
		padColumn.rowspan = context.rowspan;
		padColumn.model.key = `$pad-${columns.length}`;
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
		for (let j = 0; j < headLength; j++) {
			const headColumn = head[j];
			const pivotColumn = createColumn('pivot');
			pivotColumn.colspan = headColumn.value;
			const pivotColumnModel = pivotColumn.model;
			pivotColumnModel.title = headColumn.key;
			pivotColumnModel.key = pivotColumnModel.key + `[0][${j}]`;

			pivotColumnModel.rowIndex = 0;
			row[j] = pivotColumn;
		}

		const firstRow = rows[0];
		firstRow.push(...row);

		/*
		 * Add special column type
		 * that fills remaining place (width = 100%)
		 *
		 */
		addPadColumn(firstRow, { rowspan: 1, row: 0 });

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
				row[j] = pivotColumn;
			}

			/*
			 * Add special column type
			 * that fills remaining place (width = 100%)
			 *
			 */
			addPadColumn(row, { rowspan: 1, row: 0 });
			rows.push(row);
		}

		return rows;
	};
}

function index(columnRows) {
	const view = columnService.expand(columnRows);
	const height = view.length;
	for (let i = 0; i < height; i++) {
		const row = view[i];
		const width = row.length;
		for (let j = 0; j < width; j++) {
			const column = row[j];
			if (column.index < 0) {
				column.index = j;
			}
		}
	}

	return columnRows;
}

function filter(model, columnRows) {
	const rows = [];
	const height = columnRows.length;
	const groupBy = new Set(model.group().by);
	const pivotBy = new Set(model.pivot().by);

	for (let i = 0; i < height; i++) {
		const columnRow = columnRows[i];
		const width = columnRow.length;
		const row = [];
		for (let j = 0; j < width; j++) {
			const columnView = columnRow[j];
			const column = columnView.model;
			if (column.isVisible && !groupBy.has(column.key) && !pivotBy.has(column.key)) {
				row.push(columnView);
			}
		}

		if (row.length) {
			rows.push(row);
		}
	}

	return rows;
}

function sort(model, columnRows) {
	const columnRow = columnRows[0];
	if (columnRow) {
		const columnList = model.columnList;
		const buildIndex = sortIndexFactory(model);
		const columns = columnRow.map(column => column.model);
		const indexResult = buildIndex(columns);
		if (indexResult.hasChanges) {
			columnList({
				index: indexResult.index
			}, {
					source: 'column.pipe',
					behavior: 'core'
				});
		}

		let index = 0;
		const indexMap =
			columnList()
				.index
				.reduce((memo, key) => {
					memo[key] = index++;
					return memo;
				}, {});

		const row = Array.from(columnRow);
		row.sort((x, y) => indexMap[x.model.key] - indexMap[y.model.key]);
		const temp = Array.from(columnRows);
		temp[0] = row;
		return temp;
	}

	return columnRows;
}