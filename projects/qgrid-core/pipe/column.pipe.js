import { Guard } from '../infrastructure/guard';
import { noop } from '../utility/kit';
import { columnFactory } from '../column/column.factory';
import { generateFactory } from '../column-list/column.list.generate';
import { columnIndexPipe } from './column.index.pipe';
import { Node } from '../node/node';
import { sortIndexFactory, merge } from '../column-list/column.list.sort';

export function columnPipe(memo, context, next) {
	Guard.notNull(memo, 'memo');

	const { model } = context;
	const { pivot, nodes } = memo;
	const { head } = pivot;

	const createColumn = columnFactory(model);
	const root = new Node(createColumn('cohort', { key: '$root' }), 0);

	const addDataColumns = dataColumnsFactory(model);
	const addSelectColumn = selectColumnFactory(model);
	const addGroupColumn = groupColumnFactory(model, nodes);
	const addRowExpandColumn = rowExpandColumnFactory(model);
	const addRowIndicatorColumn = rowIndicatorColumnFactory(model);
	const addPivotColumns = pivotColumnsFactory(model);
	const addPadColumn = padColumnFactory(model);

	/*
	 * We need to invoke addDataColumns earlier that others because it setups data.columns model property
	 *
	 */
	addDataColumns(root);

	/**
	 * Control columns should be filled in reverse order because they use unshift inside.
	 */

	/*
	 * Add row expand column
	 */
	addRowExpandColumn(root);

	/*
	 * Add group column with nodes
	 *
	 */
	addGroupColumn(root);

	/*
	 * Add column with select boxes
	 * if selection unit is row
	 *
	 */
	addSelectColumn(root);

	/*
	 * Add row indicator column
	 * if rows can be dragged or resized
	 *
	 */
	addRowIndicatorColumn(root);

	/*
	 * Add column rows for pivoted data
	 * if pivot is turned on
	 *
	 */
	addPivotColumns(root, head);

	const { columnList } = model;
	const buildIndex = sortIndexFactory(model);
	const tree = merge(root, columnList().index, buildIndex);

	/*
	 * Add special column type
	 * that fills remaining place (width = 100%)
	 *
	 */
	addPadColumn(tree);

	columnIndexPipe(tree, context, ({ columns, index }) => {
		memo.columns = columns;

		columnList({
			index
		}, {
			behavior: 'core',
			source: 'column.pipe'
		});

		next(memo);
	});
}

function selectColumnFactory(model) {
	const dataColumns = model.columnList().line;
	const selection = model.selection();

	const selectColumn = dataColumns.find(item => item.type === 'select');
	const indicatorColumn = dataColumns.find(item => item.type === 'row-indicator');

	if (!indicatorColumn && selection.unit === 'mix') {
		const createColumn = columnFactory(model);
		return node => {
			const indicatorColumn = createColumn('row-indicator');
			indicatorColumn.model.source = 'generation';
			if (indicatorColumn.model.isVisible) {
				node.children.unshift(new Node(indicatorColumn, node.level + 1));
				return indicatorColumn;
			}
		};
	}

	if (!selectColumn && selection.unit === 'row') {
		const createColumn = columnFactory(model);
		return node => {
			const selectColumn = createColumn('select');
			selectColumn.model.key = `$select-${model.selection().mode}`;
			selectColumn.model.source = 'generation';
			if (selectColumn.model.isVisible) {
				node.children.unshift(new Node(selectColumn, node.level + 1));
				return selectColumn;
			}
		};
	}

	return noop;
}

function groupColumnFactory(model, nodes) {
	const dataColumns = model.columnList().line;
	const groupColumn = dataColumns.find(item => item.type === 'group');
	const { by, mode } = model.group();
	const createColumn = columnFactory(model);

	if (!groupColumn && (nodes.length || by.length)) {
		switch (mode) {
			case 'nest': {
				return node => {
					const groupColumn = createColumn('group');
					groupColumn.model.source = 'generation';
					if (groupColumn.model.isVisible) {
						node.children.unshift(new Node(groupColumn, node.level + 1));
						return groupColumn;
					}
				};
			}
			case 'rowspan':
			case 'flat': {
				return node => {
					const nodes = by
						.map(key => {
							const groupColumn = createColumn('group');
							groupColumn.model.source = 'generation';
							groupColumn.model.key = `$group-${key}`;
							groupColumn.model.title = key;
							groupColumn.model.by = key;
							return new Node(groupColumn, node.level + 1);
						})
						.filter(n => n.key.model.isVisible);

					node.children.splice(0, 0, ...nodes);
				}
			}
		}
	}

	return noop;
}

function rowExpandColumnFactory(model) {
	const dataColumns = model.columnList().line;
	const expandColumn = dataColumns.find(item => item.type === 'row-expand');
	if (model.row().unit === 'details' && !expandColumn) {
		const createColumn = columnFactory(model);
		return node => {
			const expandColumn = createColumn('row-expand');
			expandColumn.model.source = 'generation';
			if (expandColumn.model.isVisible) {
				node.children.unshift(new Node(expandColumn, node.level + 1));
				return expandColumn;
			}
		};
	}

	return noop;
}

function rowIndicatorColumnFactory(model) {
	const dataColumns = model.columnList().line;
	const rowIndicatorColumn = dataColumns.find(item => item.type === 'row-indicator');
	const { canMove, canResize } = model.row();
	if ((canMove || canResize) && !rowIndicatorColumn) {
		const createColumn = columnFactory(model);
		return node => {
			const expandColumn = createColumn('row-indicator');
			expandColumn.model.source = 'generation';
			if (expandColumn.model.isVisible) {
				node.children.unshift(new Node(expandColumn, node.level + 1));
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

	function fill(node, columns) {
		for (let column of columns) {
			const view = createColumn(column.type, column);
			const child = new Node(view, node.level + 1);
			node.children.push(child);
			fill(child, view.model.children);
		}
	}

	return node => fill(node, columns);
}

function padColumnFactory(model) {
	const createColumn = columnFactory(model);
	return node => {
		const padColumn = createColumn('pad');
		padColumn.model.key = '$pad';

		const index = node.children.findIndex(n => n.key.model.pin === 'right');
		const padNode = new Node(padColumn, node.level + 1);
		if (index >= 0) {
			node.children.splice(index, 0, padNode);
		} else {
			node.children.push(padNode);
		}

		return padColumn;
	};
}

function pivotColumnsFactory(model) {
	const createColumn = columnFactory(model);
	return function fill(node, head) {
		const { children } = head;
		for (let i = 0, length = children.length; i < length; i++) {
			const child = children[i];
			const pivotColumn = createColumn('pivot');
			const pivotColumnModel = pivotColumn.model;
			pivotColumnModel.title = child.key;
			pivotColumnModel.key = `$pivot-${child.key}`;
			const pivotNode = new Node(pivotColumn, node.level + 1);
			node.children.push(pivotNode);
			fill(pivotNode, child);
		}
	};
}
