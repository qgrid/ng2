import { GridError } from '../infrastructure/error';
import { Lazy } from '../infrastructure/lazy';
import { isFunction } from '../utility/kit';
import { collapse, expand } from './column.matrix';

export function flattenColumns(columns, result = []) {
	for (let i = 0, length = columns.length; i < length; i++) {
		const column = columns[i];
		result.push(column);

		const { children } = column;
		if (children && children.length) {
			flattenColumns(children, result);
		}
	}

	return result;
}

export function findLine(columns, key) {
	for (let index = 0, length = columns.length; index < length; index++) {
		const column = columns[index];
		if (column.key === key) {
			return { columns, index };
		}

		const { children } = column;
		if (children.length) {
			const result = findLine(children, key);
			if (result) {
				return result;
			}
		}
	}

	return null;
}

export function mapColumns(columns) {
	return columns.reduce((memo, column) => {
		memo[column.key] = column;
		return memo;
	}, {});
}

export function getCellValue(column) {
	return isFunction(column.value)
		? row => column.value(row)
		: row => row[column.key];
}

export function findColumn(columns, key) {
	const index = findIndex(columns, key);
	return index < 0 ? null : columns[index];
}

export function findIndex(columns, key) {
	let { length } = columns;
	while (length--) {
		const column = columns[length];
		if (column.key == key) {
			return length;
		}
	}

	return -1;
}

export function lineView(columnRows) {
	const height = columnRows.length;
	if (height === 1) {
		return Array.from(columnRows[0]);
	}

	if (height > 1) {
		const view = expand(columnRows);
		return collapse(view);
	}

	return [];
}

export function widthFactory(table, form) {
	const columns = table.data.columns();
	const columnMap = mapColumns(columns);
	// 2 because pad column has left padding equals to 1px and width 100%
	// that can produce 1.## values
	const PAD_SKIP = 2;

	const occupied = columns
		.filter(c => form.has(c.key) || ('' + c.width).indexOf('%') < 0)
		.reduce((memo, c) => {
			const width = calcWidth(c);
			if (width !== null) {
				memo += width;
			}

			return memo;
		}, 0);


	let rectWidth = new Lazy(() =>
		table.view.width('head-mid')
		+ table.view.width('head-left')
		+ table.view.width('head-right')
	);

	function calcWidth(column) {
		let size = column;
		if (form.has(column.key)) {
			size = form.get(column.key);
		}

		let { width } = size;
		if (width || width === 0) {
			if (('' + width).indexOf('%') >= 0) {
				const percent = Number.parseFloat(width);
				const headWidth = rectWidth.instance;
				const skipWidth = column.widthMode === 'absolute' ? PAD_SKIP : occupied + PAD_SKIP;
				width = (headWidth - skipWidth) * percent / 100;
			}

			const MIN_WIDTH = 0;
			return Math.max(Number.parseInt(width, 10), Number.parseInt(column.minWidth, 10) || MIN_WIDTH);
		}

		// the right place it's here to avoid recalculation
		if (column.widthMode === 'fit-head') {
			// can we be here before table rendered? or we need to through error
			const { cells } = table.head.context.bag;
			const thCell = Array.from(cells).find(th => th.column === column);
			if (thCell) {
				return table.head.cell(thCell.rowIndex, thCell.columnIndex).width() + PAD_SKIP;
			}
		}

		return null;
	}

	return key => {
		let column = columnMap[key];
		if (!column) {
			throw new GridError('column.service', `Column ${key} is not found`);
		}

		return calcWidth(column);
	};
}