import { map as getColumnMap } from '../column/column.service';
import { AppError } from '../infrastructure/error';
import { Aggregation } from '../services/aggregation';

export function groupBuilder(model) {
	const viewState = model.view();
	const dataState = model.data();

	const pivot = model.view().pivot;
	const pivotRows = pivot.rows;
	const pivotRowLength = pivotRows[0].length;

	const groupBy = model.group().by;
	const groupByLength = groupBy.length;

	const columnMap = getColumnMap(dataState.columns);
	const rows = dataState.rows;
	const nodes = viewState.rows;

	return (valueFactory) => {
		const result = [];
		for (let i = 0, nodeLength = nodes.length; i < nodeLength; i++) {
			const node = nodes[i];
			const key = groupBy[Math.min(node.level, groupByLength - 1)];
			const column = columnMap[key];
			if (!column) {
				throw new AppError(
					'view.pivot',
					`Invalid key "${key}"`);
			}

			const aggregation = column.aggregation || 'count';
			if (!Aggregation.hasOwnProperty(aggregation)) {
				throw new AppError(
					'view.pivot',
					`Aggregation ${aggregation} is not registered`);
			}

			const getValue = valueFactory(column);
			const aggregate = Aggregation[aggregation];

			const aggRow = new Array(pivotRowLength);
			for (let j = 0, rowLength = node.rows.length; j < rowLength; j++) {
				const rowIndex = node.rows[j];
				const pivotRow = pivotRows[rowIndex];
				const row = rows[rowIndex];
				for (let k = 0; k < pivotRowLength; k++) {
					if (pivotRow[k]) {
						let value = aggRow[k];
						if (!value) {
							value = [];
							aggRow[k] = value;
						}
						value.push(row);
					}
				}
			}

			result.push(aggRow.map(rs => aggregate(rs, getValue, column.aggregationOptions)));
		}

		return result;
	};
}