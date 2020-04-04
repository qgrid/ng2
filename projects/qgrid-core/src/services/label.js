import { isFunction } from '../utility/kit';
import { compileGet, compileSet } from '../services/path';
import { get as getValue } from '../services/value';

export function get(row, column) {
	return column.$label
		? isFunction(column.$label) ? column.$label({ $row: row }) : column.$label
		: column.label
			? isFunction(column.label) ? column.label(row) : column.label
			: column.labelPath
				? compileGet(column.labelPath)(row)
				: getValue(row, column);
}

export function getFactory(column) {
	const get = column.$label
		? isFunction(column.$label) ? row => column.$label({ $row: row }) : row => column.label
		: column.label
			? isFunction(column.label) ? row => column.label(row) : row => column.label
			: column.labelPath
				? compileGet(column.labelPath)
				: row => getValue(row, column);

	return get;
}

export function set(row, column, label) {
	if (isFunction(column.$label)) {
		return column.$label({ $row: row, $label: label });
	}

	if (isFunction(column.label)) {
		return column.label(row, label);
	}

	if (column.labelPath) {
		return compileSet(column.labelPath)(row, label);
	}
}