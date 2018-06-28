import { isFunction } from '../utility/kit';
import { AppError } from '../infrastructure/error';
import { expand, collapse } from './column.matrix';

export function flatten(columns, result = []) {
	for (let i = 0, length = columns.length; i < length; i++) {
		const column = columns[i];
		result.push(column);

		const { children } = column;
		if (children && children.length) {
			flatten(children, result);
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

export function map(columns) {
	return columns.reduce((memo, column) => {
		memo[column.key] = column;
		return memo;
	}, {});
}

export function getValue(column) {
	return isFunction(column.value)
		? row => column.value(row)
		: row => row[column.key];
}

export function find(columns, key) {
	const index = findIndex(columns, key);
	return index < 0 ? null : columns[index];
}

export function findIndex(columns, key) {
	let length = columns.length;
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
	const { layout } = table.model;
	const columns = table.data.columns();
	const columnMap = map(columns);
	form = form || layout().columns;

	const occupied = columns
		.filter(c => form.has(c.key) || ('' + c.width).indexOf('%') < 0)
		.reduce((memo, c) => {
			const width = getWidth(c);
			if (width !== null) {
				memo += width;
			}

			return memo;
		}, 0);


	let area;
	function getRect() {
		if (area) {
			return area;
		}

		area = table.view.rect('head');
		return area;
	}

	function getWidth(column) {
		let size = column;
		if (form.has(column.key)) {
			size = form.get(column.key);
		}

		let width = size.width;
		if (width || width === 0) {
			if (('' + width).indexOf('%') >= 0) {
				const percent = parseFloat(width);
				const rect = getRect();
				// 2 because pad column has left padding equals to 1px and width 100%
				// that can produce 1.## values
				const padSkip = 2;
				const skip = column.widthMode === 'relative' ? occupied + padSkip : padSkip;
				width = (rect.width - skip) * percent / 100;
			}

			return Math.max(parseInt(width), parseInt(column.minWidth));
		}

		return null;
	}

	return key => {
		let column = columnMap[key];
		if (!column) {
			throw new AppError('column.service', `Column ${key} is not found`);
		}

		return getWidth(column);
	};
}