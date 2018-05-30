import {isFunction} from '../utility/kit';
import {AppError} from '../infrastructure/error';

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

export function expand(columnRows) {
	const height = columnRows.length;
	const view = [];
	const cursors = [];
	for (let ri = 0; ri < height; ri++) {
		const columnRow = columnRows[ri];
		const columnLength = columnRow.length;
		let cursor = cursors.length > ri ? cursors[ri] : cursors[ri] = 0;
		for (let ci = 0; ci < columnLength; ci++) {
			const column = columnRow[ci];
			const rowspan = column.rowspan;
			const colspan = column.colspan;
			for (let rj = 0; rj < rowspan; rj++) {
				for (let cj = 0; cj < colspan; cj++) {
					const rij = ri + rj;
					const cij = cursor + cj;
					const viewRow = view.length > rij ? view[rij] : view[rij] = [];
					viewRow[cij] = column;

					const rijCursor = cursors.length > rij ? cursors[rij] : cursors[rij] = 0;
					if (rijCursor === cij) {
						cursors[rij] = rijCursor + 1;
					}
				}
			}

			cursor += colspan;
			cursors[ri] = cursor;
		}
	}

	return view;
}

export function collapse(view) {
	const line = [];
	const height = view.length;
	if (height) {
		const set = new Set();
		const lastRow = view[height - 1];
		const width = lastRow.length;
		for (let i = 0; i < width; i++) {
			const column = lastRow[i];
			if (set.has(column)) {
				continue;
			}

			line.push(column);
			set.add(column);
		}
	}

	return line;
}

export function widthFactory(table, form) {
	const layout = table.model.layout;
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
				const skip = column.widthMode === 'relative' ? occupied : 0;
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