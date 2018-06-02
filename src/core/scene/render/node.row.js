import { DataRow } from './data.row';
import { takeWhile, dropWhile, sumBy } from '../../utility/kit';
import { columnFactory } from '../../column/column.factory';
import { Aggregation } from '../../services/aggregation';
import { AppError } from '../../infrastructure/error';
import { set as setValue } from '../../services/value';

export class NodeRow extends DataRow {
	constructor(model) {
		super(model);

		const createColumn = columnFactory(model);
		this.reference = {
			group: createColumn('group')
		};
	}

	rowspan(node, column) {
		if (node.type === 'group') {
			const { mode } = this.model.group();
			if (node.state.expand && mode === 'rowspan' && column.model.type === 'group') {
				return node.children.reduce((memo, c) => {
					return memo + this.rowspan(c, column);
				}, 1);
			}
		}

		return super.rowspan(node, column);
	}

	colspan(node, column) {
		if (node.type === 'group') {
			const groupColumn = this.findGroupColumn(column.model.pin);
			if (groupColumn) {
				const { mode } = this.model.group();
				if (mode === 'subhead') {
					const groupSpan = takeWhile(this.columnList(column.model.pin), c => !c.model.aggregation);
					if (column.model.type === 'group') {
						return sumBy(groupSpan, c => c.colspan);
					}
				}
			}
		}

		return super.colspan(node, column);
	}

	columns(node, pin) {
		switch (node.type) {
			case 'group': {
				const groupColumn = this.findGroupColumn(pin);
				if (groupColumn) {
					const { mode } = this.model.group();

					switch (mode) {
						case 'subhead': {
							const nextColumns = dropWhile(this.columnList(pin), c => !c.model.aggregation);
							return [groupColumn].concat(nextColumns);
						}
						case 'rowspan': {
							const columns = this.columnList(pin);
							return dropWhile(columns, c => c.model.type === 'group' && c.model.by !== node.source);
						}
					}
				}
				break;
			}
			case 'row': {
				return this.columnList(pin);
			}
		}

		return super.columns(node, pin);
	}

	getValue(node, column, select) {
		const rows = this.model.data().rows;
		switch (node.type) {
			case 'group': {
				const aggregation = column.aggregation;
				if (aggregation) {
					if (!Aggregation.hasOwnProperty(aggregation)) {
						throw new AppError(
							'node.row',
							`Aggregation ${aggregation} is not registered`);
					}

					const groupRows = node.rows.map(i => rows[i]);
					return Aggregation[aggregation](groupRows, select, column.aggregationOptions);
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
					'node.visit',
					`Invalid node type ${node.type}`
				);
		}
	}

	setValue(node, column, value) {
		if (node.type === 'row') {
			const rows = this.model.data().rows;
			const rowIndex = node.rows[0];
			return setValue(rows[rowIndex], column, value);
		}

		return super.setValue(node, column, value);
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