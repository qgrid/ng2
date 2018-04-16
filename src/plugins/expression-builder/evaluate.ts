import {isObject, isArray, isFunction} from 'ng2-qgrid/core/utility';

export function evaluateFactory(thisContext, parameters) {
	return visit;

	function visit(object) {
		if (isObject(object)) {
			return visitObject(object);
		} else if (isArray(object)) {
			return visitArray(object);
		} else if (isFunction(object)) {
			return visitFunction(object);
		}

		return object;
	}

	function visitObject(object) {
		const keys = Object.keys(object);
		const length = keys.length;
		const result = {};

		for (let i = 0; i < length; i++) {
			const key = keys[i];
			result[key] = visit(object[key]);
		}

		return result;
	}

	function visitArray(array) {
		const result = [];
		for (let i = 0, length = array.length; i < length; i++) {
			result[i] = visit(array[i]);
		}
		return result;
	}

	function visitFunction(delegate) {
		return delegate.apply(thisContext, parameters);
	}
}
