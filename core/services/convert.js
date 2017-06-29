import {identity, isObject, isArray, isBoolean, isEmail} from '../utility';

export function parseFactory(type) {
	switch (type) {
		case 'text':
		case 'currency':
			return parseText;
		case 'number':
			return parseNumber;
		case 'date':
			return parseDate;
		case 'bool':
			return parseBool;
		default:
			return identity;
	}
}

export function getType(value) {
	if (isArray(value)) {
		if (value.length) {
			const itemType = getType(value[0]);
			if (!isPrimitive(itemType)) {
				return 'collection';
			}
		}

		return 'array';
	}

	if (parseNumber(value) !== null && !isNaN(value)) {
		return 'number';
	}

	if (parseBool(value) !== null) {
		return 'bool';
	}

	if (parseDate(value) !== null) {
		return 'date';
	}

	if (isObject(value)) {
		return 'object';
	}

	if (isEmail(value)) {
		return 'email';
	}

	return 'text';
}

export function isPrimitive(type) {
	switch (type) {
		case 'date':
		case 'bool':
		case 'text':
		case 'number':
		case 'email':
			return true;
		default:
			return false;
	}
}

function parseBool(value) {
	return isBoolean(value)
		? value
		: value === 'true'
			? true
			: value === 'false'
				? false
				: null;
}

function parseText(value) {
	return value !== null
		? '' + value
		: null;
}

function parseDate(value) {
	if (value === null) {
		return null;
	}

	const date = new Date(value);
	if (date !== 'Invalid Date' && !isNaN(date)) {
		return date;
	}

	return null;
}

function parseNumber(value) {
	const number = parseFloat(value);
	if (!isNaN(number) && isFinite(number)) {
		return number;
	}

	return null;
}

// function parseInteger(value) {
// 	const number = parseInt(value);
// 	if (!isNaN(number) && isFinite(number)) {
// 		return number;
// 	}
//
// 	return null;
// }