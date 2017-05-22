import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
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

const noop = () => {
};
const yes = () => true;
const no = () => false;
const identity = arg => arg;

const toCamelCase = (...names) => {
	const length = names.length;
	if (length > 0) {
		return names[0] +
			names.slice(1)
				.map(name =>
				name[0].toUpperCase() +
				name.substring(1, name.length));
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
	isUndefined,
	isBoolean,
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
	zip
};