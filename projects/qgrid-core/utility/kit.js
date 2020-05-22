import isObject from 'lodash-es/isObject';
import isFunction from 'lodash-es/isFunction';
import isArray from 'lodash-es/isArray';
import isEqual from 'lodash-es/isEqual';
import isString from 'lodash-es/isString';
import isBoolean from 'lodash-es/isBoolean';
import isNumber from 'lodash-es/isNumber';
import isDate from 'lodash-es/isDate';
import clone from 'lodash-es/clone';
import cloneDeep from 'lodash-es/cloneDeepWith';
import isUndefined from 'lodash-es/isUndefined';
import debounce from 'lodash-es/debounce';
import merge from 'lodash-es/merge';
import flatten from 'lodash-es/flatten';
import startCase from 'lodash-es/startCase';
import assignWith from 'lodash-es/assignWith';
import uniq from 'lodash-es/uniq';
import sumBy from 'lodash-es/sumBy';
import max from 'lodash-es/maxBy';
import min from 'lodash-es/minBy';
import zip from 'lodash-es/zip';
import takeWhile from 'lodash-es/takeWhile';
import dropWhile from 'lodash-es/dropWhile';
import groupBy from 'lodash-es/groupBy';

const noop = () => { };
const yes = () => true;
const no = () => false;
const identity = arg => arg;

const toCamelCase = (...names) => {
	const length = names.length;
	const nameList = names.map(name => '' + name);
	if (length > 0) {
		return (nameList[0] +
			nameList.slice(1)
				.map(name => name[0].toUpperCase() + name.substring(1, name.length))
				.join(''));
	}

	return '';
};

const isEmail = value => {
	if (value) {
		const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line no-useless-escape
		return re.test(value);
	}

	return false;
};

function compare(x, y) {
	if (x === y) {
		return 0;
	}

	if (x > y) {
		return 1;
	}

	return -1;
}

function orderBy(data, selectors, compares) {
	const length = selectors.length;
	const result = [];
	const count = data.length;

	// iterate through data to create array with applied selectors
	let index = count;
	while (index--) {
		const row = data[index];
		const criteria = [];
		for (let i = 0; i < length; i++) {
			const select = selectors[i];
			criteria.push(select(row));
		}

		result.push({ row, criteria, index });
	}

	// multi selector comparator
	const compare = (x, y) => {
		let result = 0;
		for (let i = 0; i < length; i++) {
			const compare = compares[i];
			const xv = x.criteria[i];
			const yv = y.criteria[i];

			result = compare(xv, yv, x.row, y.row);
			if (result !== 0) {
				return result;
			}
		}

		// ensures a stable sort
		return x.index - y.index;
	};

	result.sort(compare);

	// copy origin values to result array
	index = count;
	while (index--) {
		result[index] = result[index].row;
	}

	return result;
}

function htmlEncode(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function escapeRegexp(text) {
	if (!text)
		return text;

	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function binarySearch(list, value) {
	let low = 0;
	let high = list.length;
	while (low < high) {
		const mid = (low + high) >>> 1;
		if (list[mid] < value) {
			low = mid + 1
		}
		else {
			high = mid
		}
	}

	return low;
}

function isUrl(value) {
	var a = document.createElement('a');
	a.href = value;
	return (a.host && a.host != window.location.host);
}

function isImage(value) {
	return ('' + value).match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function getTypeName(type) {
	const nameRegexp = /function (.{1,})\(/;
	const results = (nameRegexp).exec(type.constructor.toString());
	return (results && results.length > 1) ? results[1] : "";
};

export {
	assignWith,
	binarySearch,
	clone,
	cloneDeep,
	compare,
	debounce,
	dropWhile,
	escapeRegexp,
	flatten,
	getTypeName,
	groupBy,
	htmlEncode,
	identity,
	isArray,
	isBoolean,
	isDate,
	isEmail,
	isEqual,
	isFunction,
	isImage,
	isNumber,
	isObject,
	isString,
	isUndefined,
	isUrl,
	max,
	merge,
	min,
	no,
	noop,
	orderBy,
	startCase,
	sumBy,
	takeWhile,
	toCamelCase,
	uniq,
	yes,
	zip,
};
