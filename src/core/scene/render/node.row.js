import { BasicRow } from './basic.row';
import { takeWhile, dropWhile, sumBy } from '../../utility/kit';
import { columnFactory } from '../../column/column.factory';
import { Aggregation } from '../../services/aggregation';
import { AppError } from '../../infrastructure/error';
import { set as setValue } from '../../services/value';
import { set as setLabel } from '../../services/label';
import { findFirstLeaf } from '../../node/node.service';

export class NodeRow extends BasicRow {
	constructor(model) {
		super(model);

		const createColumn = columnFactory(model);
		this.reference = {
			group: createColumn('group'),
			summary: createColumn('group-summary')
		};

		this.getLabel =
			this.getValue = (node, column, select) => {
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
					setValue(rows[rowIndex], column, value);
					break;
				}
				case 'value': {
					setValue(node, column, value);
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
					setLabel(rows[rowIndex], column, value);
					break;
				}
				case 'value': {
					setLabel(node, column, value);
					break;
				}
				default:
					throw new AppError('node.row', `Can't set label to ${node.type} node`);
			}
		};
	}

	colspan(node, column) {
		if (node.type === 'summary') {
			return sumBy(this.columnList(column.model.pin), c => c.colspan);
		}

		return column.colspan;
	}

	columns(node, pin) {
		if (node.type === 'summary') {
			// TODO: add pin support
			return [this.reference.summary];
		}

		return this.columnList(pin);
	}

	findGroupColumn(pin) {
		const columnList = this.columnList();
		let groupColumn = columnList.find(c => c.model.type === 'group');
		if (!groupColumn) {
			groupColumn = this.reference.group;
			if (groupColumn.model.pin === pin) {
				const firstColumn = this.columnList(pin)[0];
				groupColumn.index = firstColumn ? firstColumn.index : 0;
			}
		}

		return groupColumn.model.pin !== pin ? null : groupColumn;
	}
}

export class RowspanNodeRow extends NodeRow {
	constructor(model) {
		super(model);

		const getValueFactory = getValue => (node, column, select) => {
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

		const getValue = this.getValue;
		const getLabel = this.getLabel;

		this.getLabel = getValueFactory(getLabel);
		this.getValue = getValueFactory(getValue);
	}

	rowspan(node, column, isRoot = true) {
		switch (node.type) {
			case 'group': {
				if (column.model.type === 'group') {
					if (node.state.expand) {
						if (!isRoot || node.source === column.model.by) {
							return node.children.reduce((memo, child, i) => memo + this.rowspan(child, column, false), 0);
						} else {
							if (node.children.length) {
								return this.rowspan(node.children[0], column, false);
							}
						}
					}
					return 1;
				}
			}
		}

		return 1;
	}

	columns(node, pin) {
		switch (node.type) {
			case 'group': {
				return dropWhile(this.columnList(pin), c => c.model.type === 'group' && c.model.by !== node.source);
			}
			case 'row': {
				return this.columnList(pin).filter(c => c.model.type !== 'group');
			}
		}

		return super.columns(node, pin);
	}
}

export class SubheadNodeRow extends NodeRow {
	constructor(model) {
		super(model);
	}

	colspan(node, column) {
		switch (node.type) {
			case 'group': {
				if (column.model.type === 'group') {
					const groupColumn = this.findGroupColumn(column.model.pin);
					if (groupColumn) {
						const columns = this.columnList(column.model.pin);
						const groupspan = takeWhile(columns, c => !c.model.aggregation);
						return sumBy(groupspan, c => c.colspan);
					}
				}
				break;
			}
		}

		return super.colspan(node, column);
	}

	columns(node, pin) {
		switch (node.type) {
			case 'group': {
				const groupColumn = this.findGroupColumn(pin);
				if (groupColumn) {
					const nextColumns = dropWhile(this.columnList(pin), c => !c.model.aggregation);
					return [groupColumn].concat(nextColumns);
				}
				break;
			}
		}

		return super.columns(node, pin);
	}
}
