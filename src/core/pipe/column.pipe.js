import { columnFactory } from '../column/column.factory';
import * as columnService from '../column/column.service';
import { noop } from '../utility/kit';
import { generateFactory } from '../column-list/column.list.generate';
import { sortIndexFactory } from '../column-list/column.list.sort';
import { Guard } from '../infrastructure/guard';
import { flatten, expand } from '../column/column.matrix';

export function columnPipe(memo, context, next) {
	Guard.hasProperty(memo, 'pivot');
	Guard.hasProperty(memo, 'nodes');

	const { model } = context;
	const { pivot, nodes } = memo;
	const { heads } = pivot;
	let rowspan = Math.max(1, heads.length);

	/*
	 * We need to invoke addDataColumns earlier that others because it setups data.columns model property
	 *
	 */
	const dataColumns = []
	const addDataColumns = dataColumnsFactory(model);
	addDataColumns(dataColumns, { rowspan, row: 0 });

	if (dataColumns.length) {
		const diff = rowspan - dataColumns.length;
		if (diff > 0) {
			const firstRow = dataColumns[0];
			for (let column of firstRow) {
				column.rowspan += diff;
			}
		}
	}

	rowspan = Math.max(rowspan, dataColumns.length);

	const ctrlColumns = [];
	const addSelectColumn = selectColumnFactory(model);
	const addGroupColumn = groupColumnFactory(model, nodes);
	const addRowExpandColumn = rowExpandColumnFactory(model);
	const addRowIndicatorColumn = rowIndicatorColumnFactory(model);
	const addPivotColumns = pivotColumnsFactory(model);
	const addPadColumn = padColumnFactory(model);

	/*
	 * Add row indicator column
	 * if rows are draggable or resizable
	 *
	 */
	addRowIndicatorColumn(ctrlColumns, { rowspan, row: 0 });

	/*
	 * Add column with select boxes
	 * if selection unit is row
	 *
	 */
	addSelectColumn(ctrlColumns, { rowspan, row: 0 });

	/*
	 * Add group column with nodes
	 *
	 */
	addGroupColumn(ctrlColumns, { rowspan, row: 0 });

	/*
	 * Add row expand column
	 */
	addRowExpandColumn(ctrlColumns, { rowspan, row: 0 });

	const columnRows = [
		ctrlColumns.concat(dataColumns[0] || []),
		...dataColumns.slice(1)
	];

	/*
	 * Add columns defined by user
	 * that are visible
	 *
	 */
	if (heads.length) {
		/*
		 * Add column rows for pivoted data
		 * if pivot is turned on
		 *
		 */
		memo.columns = addPivotColumns(columnRows, heads);
	} else {
		/*
		 * Add special column type
		 * that fills remaining place (width = 100%)
		 *
		 */
		addPadColumn(columnRows[0], { rowspan, row: 0 });
		memo.columns = columnRows;
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
		return (memo, context) => {
			const indicatorColumn = createColumn('row-indicator');
			indicatorColumn.model.source = 'generation';
			indicatorColumn.rowspan = context.rowspan;
			if (indicatorColumn.model.isVisible) {
				memo.push(indicatorColumn);
				return indicatorColumn;
			}
		};
	}

	if (!selectColumn && selection.unit === 'row' && selection.mode !== 'range') {
		const createColumn = columnFactory(model);
		return (memo, context) => {
			const selectColumn = createColumn('select');
			selectColumn.model.source = 'generation';
			selectColumn.rowspan = context.rowspan;
			if (selectColumn.model.isVisible) {
				memo.push(selectColumn);
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
	const createColumn = columnFactory(model);

	if (nodes.length || groupState.by.length) {
		switch (groupState.mode) {
			case 'nest': {
				return (memo, context) => {
					const groupColumn = createColumn('group');
					groupColumn.model.source = 'generation';
					groupColumn.rowspan = context.rowspan;
					if (groupColumn.model.isVisible) {
						memo.push(groupColumn);
						return groupColumn;
					}
				};
			}
			case 'rowspan':
			case 'flat': {
				return (memo, context) =>
					groupState.by.forEach(key => {
						const groupColumn = createColumn('group');
						groupColumn.model.source = 'generation';
						groupColumn.rowspan = context.rowspan;
						groupColumn.model.key = `$group-${key}`;
						groupColumn.model.title = key;
						groupColumn.model.by = key;

						if (groupColumn.model.isVisible) {
							memo.push(groupColumn);
						}
					});
			}
		}
	}

	return noop;
}

function rowExpandColumnFactory(model) {
	const dataColumns = model.data().columns;
	const expandColumn = dataColumns.find(item => item.type === 'row-expand');
	if (model.row().unit === 'details' && !expandColumn) {
		const createColumn = columnFactory(model);
		return (memo, context) => {
			const expandColumn = createColumn('row-expand');
			expandColumn.model.source = 'generation';
			expandColumn.rowspan = context.rowspan;
			if (expandColumn.model.isVisible) {
				memo.push(expandColumn);
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
		return (memo, context) => {
			const expandColumn = createColumn('row-indicator');
			expandColumn.model.source = 'generation';
			expandColumn.rowspan = context.rowspan;
			if (expandColumn.model.isVisible) {
				memo.push(expandColumn);
				return expandColumn;
			}
		};
	}

	return noop;
}

function dataColumnsFactory(model) {
	const getColumns = generateFactory(model);
	const createColumn = columnFactory(model);
	const { hasChanges, columns } = getColumns();
	if (hasChanges) {
		model.data({ columns }, { source: 'column.pipe', behavior: 'core' });
	}

	return (memo, context) => {
		const rows = flatten(columns, createColumn, context);
		memo.push(...rows);

		return columns;
	};
}

function padColumnFactory(model) {
	const createColumn = columnFactory(model);
	return (memo, context) => {
		const padColumn = createColumn('pad');
		padColumn.rowspan = context.rowspan;
		padColumn.model.key = `$pad-${memo.length}`;
		memo.push(padColumn);
		return padColumn;
	};
}

function pivotColumnsFactory(model) {
	const createColumn = columnFactory(model);
	const addPadColumn = padColumnFactory(model);
	return (memo, heads) => {
		/*
		 * Data columns + first row pivot columns
		 *
		 */
		const head = heads[0];
		const headLength = head.length;
		const row = new Array(headLength);
		for (let i = 0; i < headLength; i++) {
			const headColumn = head[i];
			const pivotColumn = createColumn('pivot');
			pivotColumn.colspan = headColumn.value;
			const pivotColumnModel = pivotColumn.model;
			pivotColumnModel.title = headColumn.key;
			pivotColumnModel.key = pivotColumnModel.key + `[0][${i}]`;

			pivotColumnModel.rowIndex = 0;
			row[i] = pivotColumn;
		}

		const firstRow = memo[0];
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
			memo.push(row);
		}

		return memo;
	};
}

function index(columnRows) {
	const mx = expand(columnRows);
	for (let y = 0, height = mx.length; y < height; y++) {
		const row = mx[y];
		for (let x = 0, width = row.length; x < width; x++) {
			const column = row[x];
			if (column.index < 0) {
				column.index = x;
			}
		}
	}

	return columnRows;
}

function filter(model, columnRows) {
	const rows = [];
	const groupBy = new Set(model.group().by);
	const pivotBy = new Set(model.pivot().by);

	for (let y = 0, height = columnRows.length; y < height; y++) {
		const columnRow = columnRows[y];
		const row = [];
		for (let x = 0, width = columnRow.length; x < width; x++) {
			const columnView = columnRow[x];
			const { isVisible, key } = columnView.model;
			if (isVisible && !groupBy.has(key) && !pivotBy.has(key)) {
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
		const { hasChanges, index } = buildIndex(columns);
		if (hasChanges) {
			columnList({ index }, { source: 'column.pipe', behavior: 'core' });
		}

		const indexMap =
			columnList()
				.index
				.reduce((memo, key, i) => {
					memo[key] = i;
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