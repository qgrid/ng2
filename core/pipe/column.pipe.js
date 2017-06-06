import {columnFactory} from '../column/column.factory';
import * as columnService from '../column/column.service';
import {noop} from '../utility';

export function columnPipe(memo, context, next) {
	const model = context.model;
	const pivot = memo.pivot;
	const nodes = memo.nodes;
	const heads = pivot.heads;
	const columns = [];
	const addSelectColumn = selectColumnFactory(model);
	const addGroupColumn = groupColumnFactory(model, nodes);
	const addDataColumns = dataColumnsFactory(model);
	const addPivotColumns = pivotColumnsFactory(model);
	const addPadColumn = padColumnFactory(model);

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

	columns.forEach((c, i) => c.index = i);

	/*
	 * Add columns defined by user
	 * that are visible
	 *
	 */
	addDataColumns(columns, {rowspan: heads.length, row: 0});


	/*
	 * Persist order of draggable columns
	 *
	 */
	let index = 0;
	const columnMap = columnService.map(columns.map(c => c.model));
	const indexMap = model.columnList()
		.index
		.filter(key => columnMap.hasOwnProperty(key))
		.reduce((memo, key) => {
			memo[key] = index++;
			return memo;
		}, {});

	const hangoutColumns = columns.filter(c => !indexMap.hasOwnProperty(c.model.key));
	const indexedColumns = columns.filter(c => indexMap.hasOwnProperty(c.model.key));
	const startIndex = hangoutColumns.length;

	hangoutColumns.forEach((c, i) => c.model.index = i);
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
			const selectColumn = createColumn('row-indicator');
			selectColumn.model.source = 'generation';
			selectColumn.rowspan = context.rowspan;
			columns.push(selectColumn);
			return selectColumn;
		};
	}

	if (!selectColumn && selection.unit === 'row' && selection.mode !== 'range') {
		const createColumn = columnFactory(model);
		return (columns, context) => {
			const selectColumn = createColumn('select');
			selectColumn.model.source = 'generation';
			selectColumn.rowspan = context.rowspan;
			columns.push(selectColumn);
			return selectColumn;
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
			columns.push(groupColumn);
			return groupColumn;
		};
	}

	return noop;
}

function dataColumnsFactory(model) {
	const createColumn = columnFactory(model);
	return (columns, context) => {
		const dataColumns = model.data().columns;
		columns.push(...
			columnService.dataView(
				dataColumns
					.map(c => {
						const dataColumn = createColumn(c.type || 'text', c);
						dataColumn.rowspan = context.rowspan;
						return dataColumn;
					}),
				model));

		return dataColumns;
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