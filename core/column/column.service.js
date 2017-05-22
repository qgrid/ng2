import {isFunction} from '../services/utility';

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

export function findView(columns, key) {
	let length = columns.length;

	while (length--) {
		const column = columns[length];
		if (column.model.key == key) {
			return column;
		}
	}

	return null;
}

export function dataView(columns, model) {
	const groupBy = new Set(model.group().by);
	const pivotBy = new Set(model.pivot().by);
	return columns.filter(c => !groupBy.has(c.model.key) && !pivotBy.has(c.model.key) && c.model.isVisible !== false);
}

export function lineView(columnRows) {
	const height = columnRows.length;
	if (height === 1) {
		const columnRow = columnRows[0];
		return columnRow
			.filter(c => c.model.pin === 'left')
			.concat(columnRow.filter(c => !c.model.pin))
			.concat(columnRow.filter(c => c.model.pin === 'right'));
	}

	if (height > 1) {
		const viewColumns = columnRows[0].filter(c => c.model.type !== 'pivot' && c.model.type !== 'pad');
		const pivotColumns = columnRows[columnRows.length - 1].filter(c => c.model.type === 'pivot' || c.model.type === 'pad');
		return viewColumns
			.filter(c => c.model.pin === 'left')
			.concat(viewColumns.filter(c => !c.model.pin))
			.concat(pivotColumns)
			.concat(viewColumns.filter(c => c.model.pin === 'right'));
	}

	return [];
}

export function widthFactory(model, form) {
	const layout = model.layout;
	form = form || layout().columns;

	function materialize(column) {
		const width = column.width;
		if (('' + width).indexOf('%') >= 0) {
			return width;
		}

		return Math.max(parseInt(width), parseInt(column.minWidth || 20)) + 'px';
	}

	return column => {
		if (form.hasOwnProperty(column.key)) {
			column = form[column.key];
		}

		return column.width || column.width === 0 ? materialize(column) : null;
	};
}