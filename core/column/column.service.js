import {isFunction} from '../utility';

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