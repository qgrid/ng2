import { Guard } from '../infrastructure/guard';
import { noop } from '../utility/kit';
import { guid } from '../services/guid';
import { columnFactory } from '../column/column.factory';
import { generateFactory } from '../column-list/column.list.generate';
import { columnIndexPipe } from './column.index.pipe';
import { Node } from '../node/node';
import { bend, copy } from '../node/node.service';
import { preOrderDFS } from '../node/node.service';
import { sortIndexFactory } from '../column-list/column.list.sort';

export function columnPipe(memo, context, next) {
	Guard.hasProperty(memo, 'pivot');
	Guard.hasProperty(memo, 'nodes');

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
	const tree = sort(root, columnList().index, buildIndex);

	/*
	 * Add special column type
	 * that fills remaining place (width = 100%)
	 *
	 */
	addPadColumn(tree);

	columnIndexPipe(tree, context, ({ columns, index }) => {
		memo.columns = columns;

		columnList(
			{
				index
			},
			{
				behavior: 'core',
				source: 'column.pipe'
			}
		);

		next(memo);
	});
}

function selectColumnFactory(model) {
	const dataColumns = model.columnList().line;
	const selection = model.selection();

	const selectColumn = dataColumns.find(item => item.type === 'select');
	const indicatorColumn = dataColumns.find(
		item => item.type === 'row-indicator'
	);

	if (!indicatorColumn && selection.unit === 'mix') {
		const createColumn = columnFactory(model);
		return node => {
			const indicatorColumn = createColumn('row-indicator');
			indicatorColumn.model.source = 'generation';
			if (indicatorColumn.model.isVisible) {
				node.children.unshift(
					new Node(indicatorColumn, node.level + 1)
				);
				return indicatorColumn;
			}
		};
	}

	if (
		!selectColumn &&
		selection.unit === 'row' &&
		selection.mode !== 'range'
	) {
		const createColumn = columnFactory(model);
		return node => {
			const selectColumn = createColumn('select');
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
						node.children.unshift(
							new Node(groupColumn, node.level + 1)
						);
						return groupColumn;
					}
				};
			}
			case 'rowspan':
			case 'flat': {
				return node =>
					by.forEach(key => {
						const groupColumn = createColumn('group');
						groupColumn.model.source = 'generation';
						groupColumn.model.key = `$group-${key}`;
						groupColumn.model.title = key;
						groupColumn.model.by = key;

						if (groupColumn.model.isVisible) {
							node.children.unshift(
								new Node(groupColumn, node.level + 1)
							);
						}
					});
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
	const rowIndicatorColumn = dataColumns.find(
		item => item.type === 'row-indicator'
	);
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
		padColumn.model.key = `$pad-${guid()}`;
		node.children.push(new Node(padColumn, node.level + 1));
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

function running(tree, buildIndex) {
	const result = {
		line: [],
		set: new Set()
	};

	preOrderDFS([tree], node => {
		result.line.push(node);
		result.set.add(node.key.model.key);

		// As we use pre order direction we can manipulate with children without affecting on algorithm.
		// Below we sort columns in appropriate order.
		const columns = node.children.map(child => child.key.model);
		const index = buildIndex(columns);

		let cursor = 0;
		const indexMap = index.reduce((memo, key) => {
			memo[key] = cursor++;
			return memo;
		}, {});

		node.children.sort(
			(x, y) => indexMap[x.key.model.key] - indexMap[y.key.model.key]
		);
	});

	return result;
}

function former(tree, current) {
	const result = {
		line: [],
		set: new Set()
	};

	preOrderDFS([tree], node => {
		// Filter out nodes if they were deleted from newTree.
		const { key } = node.key.model;
		if (current.set.has(key)) {
			result.line.push(copy(node));
			result.set.add(key);
		}
	});

	return result;
}

function insertFactory(screen) {
	const { line } = screen;
	return (prevNode, node) => {
		const pos = line.findIndex(
			n => n.key.model.key === prevNode.key.model.key
		);

		const level = line[pos].level;
		const target = copy(node);
		target.level = level + (node.level - prevNode.level);
		line.splice(pos + 1, 0, target);
	};
}

function insertCohortFactory(screen) {
	const insertNear = insertFactory(screen);
	const { line } = screen;
	return (prevNode, node) => {
		const set = new Set(node.children.map(n => n.key.model.key));
		const index = line.findIndex(n => set.has(n.key.model.key));

		if (index < 0) {
			insertNear(prevNode, node);
			return;
		}

		const target = copy(node);
		const { level } =  line[index];
		target.level = level;
		line.splice(index, 0, target);

		for (let i = index + 1, end = line.length; i < end; i++ ) {
			const child = line[i];
			if (child.level !== level) {
				break;
			}

			if (set.has(child.key.model.key)) {
				child.level = level + 1;
			}
		}
	};
}

function sort(newTree, oldTree, buildIndex) {
	const current = running(newTree, buildIndex);
	const screen = former(oldTree, current);
	const insertNear = insertFactory(screen);
	const insertCohort = insertCohortFactory(screen);

	const root = current.line[0];
	if (!screen.set.has(root.key.model.key)) {
		screen.line.unshift(copy(root));
		screen.line.forEach(n => n.level++);
	}

	for (let i = 1, length = current.line.length; i < length; i++) {
		const node = current.line[i];
		const { model } = node.key;
		if (screen.set.has(model.key)) {
			continue;
		}

		const prevNode = current.line[i - 1];
		if (model.type === 'cohort') {
			insertCohort(prevNode, node);
		} else {
			insertNear(prevNode, node);
		}
	}

	const bendedTree = bend(screen.line);
	return bendedTree;
}
