import { isFunction } from '../utility/kit';
import { compileSet, compileGet } from './path';
import { AppError } from '../infrastructure/error';

export function get(row, column) {
	return column.$value
		? column.$value({ $row: row, $column: column })
		: column.value
			? column.value(row)
			: column.path
				? compileGet(column.path)(row)
				: row[column.key];
}

export function getFactory(column) {
	const get = column.$value
		? row => column.$value({ $row: row, $column: column })
		: column.value
			? row => column.value(row)
			: column.path
				? compileGet(column.path)
				: row => row[column.key];

	return get;
}

export function set(row, column, value) {
	if (isFunction(column.$value)) {
		return column.$value({ $row: row, $value: value, $column: column });
	}

	if (isFunction(column.value)) {
		return column.value(row, value);
	}

	if (column.path) {
		return compileSet(column.path)(row, value);
	}

	if (row.hasOwnProperty(column.key)) {
		return row[column.key] = value;
	}

	throw new AppError(
		'value',
		`Row can't be edit on "${column.key}" column`);
}