import {
	identity,
	isObject,
	isArray,
	isBoolean,
	isDate,
	isNumber,
	isEmail,
	isString,
	isUrl,
	isImage,
	isUndefined,
	matchISO8601
} from '../utility/kit';

// TODO: right now we check the empty result on null, 
// we need to have a way to make it more explicitly
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
		case 'date':
			return parseDate;
		case 'time':
		case 'datetime':
			return parseDateTime;
		case 'bool':
			return parseBool;
		case 'array':
			return parseArray;
		default:
			return identity;
	}
}

export function compareParseFactory(type, editor) {
	switch (type) {
		case 'id': {
			type = editor ? editor : 'text';
			break;
		}
	}

	switch (type) {
		case 'date':
			return x => {
				const date = parseDate(x);
				if (date) {
					return date.getTime();
				}

				return date;
			};
		case 'time':
		case 'datetime':
			return x => {
				const date = parseDateTime(x);
				if (date) {
					return date.getTime();
				}

				return date;
			};
		default: {
			return parseFactory(type, editor);
		}
	}
}



export function resolveType(values) {
	const types = values
		.filter(x => !(isUndefined(x) || x === null || x === ''))
		.map(getType);

	if (types.length) {
		const test = types[0];
		if (types.every(x => x === test)) {
			return test;
		}
	}

	return 'text';
}

export function getType(value) {
	if (isArray(value)) {
		if (value.length) {
			const itemType = findType(value[0]);
			if (!isPrimitive(itemType)) {
				return 'collection';
			}
		}

		return 'array';
	}

	if (isNumber(value)) {
		return 'number';
	}

	if (isBoolean(value)) {
		return 'bool';
	}

	if (isDate(value)) {
		return 'datetime';
	}

	if (isString(value)) {
		return 'text';
	}

	if (isObject(value)) {
		return 'object';
	}

	return 'text';

}

export function inferType(values) {
	const types = values
		.filter(x => !(isUndefined(x) || x === null || x === ''))
		.map(findType);

	if (types.length) {
		const test = types[0];
		if (types.every(x => x === test)) {
			return test;
		}
	}

	return 'text';
}

export function findType(value) {
	if (isArray(value)) {
		if (value.length) {
			const itemType = findType(value[0]);
			if (!isPrimitive(itemType)) {
				return 'collection';
			}
		}

		return 'array';
	}

	if (likeNumber(value)) {
		return 'number';
	}

	if (isBoolean(value)) {
		return 'bool';
	}

	if (likeDateTime(value)) {
		return 'datetime';
	}

	if (likeDate(value)) {
		return 'date';
	}

	if (isEmail(value)) {
		return 'email';
	}

	if (isImage(value)) {
		return 'image';
	}

	if (isUrl(value)) {
		return 'url';
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
		case 'time':
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

function likeDateTime(value) {
	if (value === null || isUndefined(value) || value === '') {
		return false;
	}

	if (value instanceof Date) {
		return true;
	}

	value = '' + value;

	return matchISO8601(value);
}

function likeDate(value) {
	if (value === null || isUndefined(value) || value === '') {
		return false;
	}

	if (value instanceof Date) {
		return true;
	}

	value = '' + value;

	// ISO_8601
	return !!value.match(/^(\d{4})(-(\d{2})(-(\d{2})))$/);
}

function likeNumber(value) {
	if (isNaN(value)) {
		return false;
	}

	const number = Number.parseFloat(value);
	return !isNaN(number) && isFinite(number);
}

function parseBool(value) {
	return value === null || isUndefined(value)
		? value
		: !!value;
}

function parseText(value) {
	return value === null || isUndefined(value)
		? value
		: '' + value;
}

function parseDate(value) {
	if (value === null || isUndefined(value)) {
		return value
	}

	if (value === '') {
		return null;
	}

	if (value instanceof Date) {
		return new Date(
			value.getFullYear(),
			value.getMonth(),
			value.getDate(),
			0, 0, 0, 0
		);
	}

	if (likeDate(value) || matchISO8601(value)) {
		const yearMonthDay = ('' + value).split('-');
		return new Date(
			Number.parseInt(yearMonthDay[0]),
			Number.parseInt(yearMonthDay[1]) - 1,
			Number.parseInt(yearMonthDay[2]),
			0, 0, 0, 0
		);
	}

	return new Date('' + value);
}

function parseDateTime(value) {
	if (value === null || isUndefined(value)) {
		return value
	}

	if (value === '') {
		return null;
	}

	if (value instanceof Date) {
		return value;
	}

	const date = new Date('' + value);
	return date;
}

function parseNumber(value) {
	if (value === null || isUndefined(value)) {
		return value
	}

	if (value === '' || isNaN(value)) {
		return null;
	}

	const number = Number.parseFloat(value);
	if (!isNaN(number) && isFinite(number)) {
		return number;
	}

	return null;
}

function parseArray(value) {
	return value;
}
