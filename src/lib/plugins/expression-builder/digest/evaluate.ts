import { isObject, isArray, isFunction } from 'ng2-qgrid/core/utility/kit';

export function evaluateFactory(expression, args) {
	return visit;

	function visit(value) {
		if (isArray(value)) {
			return visitArray(value);
		} else if (isFunction(value)) {
			return visitFunction(value);
		} else if (isObject(value)) {
			return visitObject(value);
		}

		return value;
	}

	function visitObject(inst) {
		const keys = Object.keys(inst);
		const length = keys.length;
		const result = {};
		for (let i = 0; i < length; i++) {
			const key = keys[i];
			result[key] = visit(inst[key]);
		}

		return result;
	}

	function visitArray(list) {
		const result = [];
		for (let i = 0, length = list.length; i < length; i++) {
			result[i] = visit(list[i]);
		}
		return result;
	}

	function visitFunction(delegate) {
		return delegate.apply(expression, args);
	}
}
