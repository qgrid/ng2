import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import isDate from 'lodash/isDate';
import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeepWith';
import isUndefined from 'lodash/isUndefined';
import debounce from 'lodash/debounce';
import merge from 'lodash/merge';
import flatten from 'lodash/flatten';
import startCase from 'lodash/startCase';
import assignWith from 'lodash/assignWith';
import uniq from 'lodash/uniq';
import sumBy from 'lodash/sumBy';
import max from 'lodash/maxBy';
import min from 'lodash/minBy';
import zip from 'lodash/zip';
import takeWhile from 'lodash/takeWhile';
import dropWhile from 'lodash/dropWhile';
import groupBy from 'lodash/groupBy';

const noop = () => {
};
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

		result.push({row, criteria, index});
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

export {
	isObject,
	isFunction,
	isArray,
	isEqual,
	isString,
	isUndefined,
	isBoolean,
	isDate,
	isNumber,
	isEmail,
	clone,
	cloneDeep,
	debounce,
	merge,
	flatten,
	startCase,
	assignWith,
	uniq,
	identity,
	yes,
	no,
	toCamelCase,
	noop,
	compare,
	orderBy,
	max,
	min,
	sumBy,
	zip,
	takeWhile,
	dropWhile,
	groupBy
};