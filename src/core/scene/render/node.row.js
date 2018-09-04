import { takeWhile, dropWhile, sumBy } from '../../utility/kit';
import { columnFactory } from '../../column/column.factory';
import { Aggregation } from '../../services/aggregation';
import { AppError } from '../../infrastructure/error';
import { findFirstLeaf } from '../../group/group.service';

export class NodeRow {
	constructor(model, dataRow) {
		const { columnList, rowspan } = dataRow;

		this.columnList = columnList;
		this.rowspan = rowspan;

		const createColumn = columnFactory(model);
		const reference = {
			group: createColumn('group'),
			summary: createColumn('group-summary')
		};

		this.getLabel =
			this.getValue = (node, column, select, rowIndex, columnIndex) => {
				if (column.type === 'pivot') {
					return dataRow.getLabel(node, column, select, rowIndex, columnIndex);
				}

				const { rows } = model.data();
				switch (node.type) {
					case 'group':
					case 'summary': {
						const agg = column.aggregation;
						if (agg) {
							if (!Aggregation.hasOwnProperty(agg)) {
								throw new AppError(
									'node.row',
									`Aggregation ${agg} is not supported`);
							}

							const groupRows = node.rows.map(i => rows[i]);
							return Aggregation[agg](groupRows, select, column.aggregationOptions);
						}

						return null;
					}
					case 'row': {
						const rowIndex = node.rows[0];
						return select(rows[rowIndex], column);
					}
					case 'value': {
						return select(node, column);
					}
					default:
						throw new AppError(
							'node.row',
							`Invalid node type ${node.type}`
						);
				}
			};

		this.setValue = (node, column, value, rowIndex, columnIndex) => {
			switch (node.type) {
				case 'row': {
					const { rows } = model.data();
					const rowIndex = node.rows[0];
					dataRow.setValue(rows[rowIndex], column, value, rowIndex, columnIndex);
					break;
				}
				case 'value': {
					dataRow.setValue(node, column, value, rowIndex, columnIndex);
					break;
				}
				default:
					throw new AppError('node.row', `Can't set value to ${node.type} node`);
			}
		};

		this.setLabel = (node, column, value, rowIndex, columnIndex) => {
			switch (node.type) {
				case 'row': {
					const { rows } = model.data();
					const rowIndex = node.rows[0];
					dataRow.setLabel(rows[rowIndex], column, value, rowIndex, columnIndex);
					break;
				}
				case 'value': {
					dataRow.setLabel(node, column, value, rowIndex, columnIndex);
					break;
				}
				default:
					throw new AppError('node.row', `Can't set label to ${node.type} node`);
			}
		};

		this.colspan = (node, column) => {
			if (node.type === 'summary') {
				return sumBy(columnList(column.model.pin), c => c.colspan);
			}

			return column.colspan;
		};

		this.columns = (node, pin) => {
			if (node.type === 'summary') {
				// TODO: add pin support
				return [reference.summary];
			}

			return columnList(pin);
		};

		this.findGroupColumn = (pin) => {
			const columns = columnList();
			let groupColumn = columns.find(c => c.model.type === 'group');
			if (!groupColumn) {
				groupColumn = reference.group;
				if (groupColumn.model.pin === pin) {
					const firstColumn = columnList(pin)[0];
					groupColumn.columnIndex = firstColumn ? firstColumn.columnIndex : 0;
				}
			}

			return groupColumn.model.pin !== pin ? null : groupColumn;
		};
	}
}

export class RowspanNodeRow {
	constructor(model, nodeRow) {
		const { columnList, getValue, getLabel, columns } = nodeRow;

		this.setValue = nodeRow.setValue;
		this.setLabel = nodeRow.setLabel;
		this.colspan = nodeRow.colspan;
		this.columnList = columnList;
		
		const rowspan = (node, column, isRoot = true) => {
			switch (node.type) {
				case 'group': {
					if (column.model.type === 'group') {
						if (node.state.expand) {
							if (!isRoot || node.source === column.model.by) {
								return node.children.reduce((memo, child, i) => memo + rowspan(child, column, false), 0);
							} else {
								if (node.children.length) {
									return rowspan(node.children[0], column, false);
								}
							}
						}
						return 1;
					}
				}
			}

			return 1;
		};

		this.rowspan = rowspan;

		const spanValue = getValue => (node, column, select) => {
			switch (node.type) {
				case 'group': {
					const leaf = findFirstLeaf(node);
					if (leaf) {
						const { rows } = model.data();
						const rowIndex = leaf.rows[0];
						return select(rows[rowIndex], column);
					}

					return null;
				}
			}

			return getValue(node, column, select);
		};

		this.getLabel = spanValue(getLabel);
		this.getValue = spanValue(getValue);

		this.columns = (node, pin) => {
			switch (node.type) {
				case 'group': {
					return dropWhile(columnList(pin), c => c.model.type === 'group' && c.model.by !== node.source);
				}
				case 'row': {
					return columnList(pin).filter(c => c.model.type !== 'group');
				}
			}

			return columns(node, pin);
		};
	}
}

export class SubheadNodeRow {
	constructor(nodeRow) {
		const { columnList, columns, findGroupColumn } = nodeRow;

		this.setValue = nodeRow.setValue;
		this.setLabel = nodeRow.setLabel;
		this.getValue = nodeRow.getValue;
		this.getLabel = nodeRow.getLabel;
		this.rowspan = nodeRow.rowspan;
		this.columnList = columnList;

		this.colspan = (node, column) => {
			switch (node.type) {
				case 'group': {
					if (column.model.type === 'group') {
						const groupColumn = findGroupColumn(column.model.pin);
						if (groupColumn) {
							const nearGroupColumns = columnList(column.model.pin);
							const groupSpan = takeWhile(nearGroupColumns, c => !c.model.aggregation);
							return sumBy(groupSpan, c => c.colspan);
						}
					}
					break;
				}
			}

			return nodeRow.colspan(node, column);
		};

		this.columns = (node, pin) => {
			switch (node.type) {
				case 'group': {
					const groupColumn = findGroupColumn(pin);
					if (groupColumn) {
						const nextColumns = dropWhile(columnList(pin), c => !c.model.aggregation);
						return [groupColumn].concat(nextColumns);
					}
					break;
				}
			}

			return columns(node, pin);
		};
	}
}
