import {isFunction} from '../utility';
import {compile} from '../services/path';
import {get as getValue} from '../services/value';

export function get(row, column) {
	return column.$label
		? column.$label({$row: row})
		: column.label
			? column.label(row)
			: column.labelPath
				? compile(column.labelPath)(row)
				: getValue(row, column);
}

export function getFactory(column) {
	const get = column.$label
		? row => column.$label({$row: row})
		: column.label
			? row => column.label(row)
			: column.labelPath
				? compile(column.labelPath)
				: row => getValue(row, column);

	return row => get(row);
}

export function set(row, column, label) {
	if (isFunction(column.$label)) {
		return column.$label({$row: row, $label: label});
	}

	if (isFunction(column.label)) {
		return column.label(row, label);
	}

	if (column.labelPath) {
		return compile(column.labelPath)(row, label);
	}
}