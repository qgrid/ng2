import { isArray, isFunction, isObject } from '@qgrid/core';
import { Expression } from '../model/expression';

export function evaluateFactory(expression: Expression, args: unknown[]) {
  return visit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function visit(value: any) {
    if (isArray(value)) {
      return visitArray(value);
    } else if (isFunction(value)) {
      return visitFunction(value);
    } else if (isObject(value)) {
      return visitObject(value);
    }

    return value;
  }

  function visitObject(inst: object) {
    const keys = Object.keys(inst);
    const length = keys.length;
    const result = {};
    for (let i = 0; i < length; i++) {
      const key = keys[i];
      result[key] = visit(inst[key]);
    }

    return result;
  }

  function visitArray(list: unknown[]) {
    const result = [];
    for (let i = 0, length = list.length; i < length; i++) {
      result[i] = visit(list[i]);
    }
    return result;
  }

  function visitFunction(delegate: (...argums: unknown[]) => unknown) {
    return delegate.apply(expression, args);
  }
}
