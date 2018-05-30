import { identity, isObject, isArray, isBoolean, isEmail, isString } from '../utility/kit';

export function parseFactory(type, editor) {
	switch (type) {
		case 'id': {
			type = editor ? editor : 'text';
			break;
		}
	}

	switch (type) {
		case 'text':
		case 'email':
		case 'url':
		case 'password':
			return parseText;
		case 'number':
		case 'currency':
			return parseNumber;
		case 'time':
		case 'date':
			return parseDate;
		case 'bool':
			return parseBool;
		case 'array':
			return parseArray;
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

	if (isEmail(value)) {
		return 'email';
	}

	if (isString(value)) {
		return 'text';
	}

	if (isObject(value)) {
		return 'object';
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
		case 'url':
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

	if (value instanceof Date) {
		return value;
	}

	value = '' + value;
	const m = value.match(/^(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/);
	if (m) {
		const utc = Date.UTC(
			m[1],
			m[3] ? m[3] - 1 : 0,
			m[5] || 1,
			m[7] || 0,
			m[8] || 0,
			m[10] || 0,
			m[12] ? Number('0.' + m[12]) * 1000 : 0
		);
		const date = new Date(utc);
		if (m[13]) { // has gmt offset or Z
			if (m[14]) { // has gmt offset
				date.setUTCMinutes(
					date.getUTCMinutes() +
					(m[15] == '-' ? 1 : -1) * (Number(m[16]) * 60 + (m[18] ? Number(m[18]) : 0))
				);
			}
		}
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

function parseArray(value) {
	if (isArray(value)) {
		return value;
	}

	return null;
}