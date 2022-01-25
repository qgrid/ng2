import { isArray, isFunction, isObject } from '@qgrid/core';

export function evaluateFactory(expression: any, args: any) {
	return visit;

	function visit(value: any): any {
		if (isArray(value)) {
			return visitArray(value);
		} else if (isFunction(value)) {
			return visitFunction(value);
		} else if (isObject(value)) {
			return visitObject(value);
		}

		return value;
	}

	function visitObject(inst: any) {
		const keys = Object.keys(inst);
		const length = keys.length;
		const result: any = {};
		for (let i = 0; i < length; i++) {
			const key = keys[i];
			result[key] = visit(inst[key]);
		}

		return result;
	}

	function visitArray(list: any[]) {
		const result = [];
		for (let i = 0, length = list.length; i < length; i++) {
			result[i] = visit(list[i]);
		}
		return result;
	}

	function visitFunction(delegate: any) {
		return delegate.apply(expression, args);
	}
}
