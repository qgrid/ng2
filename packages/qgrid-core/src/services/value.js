import { GridError } from '../infrastructure/error';
import { isFunction } from '../utility/kit';
import { compileGet, compileSet } from './path';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function getValue(row, column) {
	return column.$value
		? column.$value({ $row: row, $column: column })
		: column.value
			? column.value(row)
			: column.path
				? compileGet(column.path)(row)
				: row[column.key];
}

export function getValueFactory(column) {
	const get = column.$value
		? row => column.$value({ $row: row, $column: column })
		: column.value
			? row => column.value(row)
			: column.path
				? compileGet(column.path)
				: row => row[column.key];

	return get;
}

export function setValue(row, column, value) {
	if (isFunction(column.$value)) {
		return column.$value({ $row: row, $value: value, $column: column });
	}

	if (isFunction(column.value)) {
		return column.value(row, value);
	}

	if (column.path) {
		return compileSet(column.path)(row, value);
	}

	if (hasOwnProperty.call(row, column.key)) {
		return row[column.key] = value;
	}

	throw new GridError(
		'value',
		`Row can't be edit on "${column.key}" column`
	);
}
