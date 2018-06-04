import { isFunction } from '../utility/kit';
import { AppError } from '../infrastructure/error';

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

export function expand(rows) {
	const matrix = [];
	const offsets = [];
	for (let y = 0, height = rows.length; y < height; y++) {
		const columns = rows[y];
		let offset = offsets.length > y ? offsets[y] : offsets[y] = 0;
		for (let x = 0, width = columns.length; x < width; x++) {
			const column = columns[x];
			const { rowspan, colspan } = column;
			for (let i = 0; i < rowspan; i++) {
				for (let j = 0; j < colspan; j++) {
					const yi = y + i;
					const xj = offset + j;
					const row = matrix.length > yi ? matrix[yi] : matrix[yi] = [];
					row[xj] = column;

					const cursor = offsets.length > yi ? offsets[yi] : offsets[yi] = 0;
					if (cursor === xj) {
						offsets[yi] = cursor + 1;
					}
				}
			}

			offset += colspan;
			offsets[y] = offset;
		}
	}

	return matrix;

}

export function collapse(matrix) {
	const line = [];
	const height = matrix.length;
	if (height) {
		const set = new Set();
		const lastRow = matrix[height - 1];
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