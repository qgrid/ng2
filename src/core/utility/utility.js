import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
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
import orderBy from 'lodash/orderBy';
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
		const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(value);
	}

	return false;
};

export {
	isObject,
	isFunction,
	isArray,
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
	orderBy,
	max,
	min,
	sumBy,
	zip,
	takeWhile,
	dropWhile,
	groupBy
};