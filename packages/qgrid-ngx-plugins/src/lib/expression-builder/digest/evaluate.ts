import { isArray, isFunction, isObject } from '@qgrid/core';

export type Evaluated<T> =
  T extends (...x: any[]) => infer X ? Evaluated<X> :
  T extends Array<infer X> ? Array<Evaluated<X>> :
  T extends { [K in keyof T]: unknown } ? { [K in keyof T]: Evaluated<T[K]> } :
  T;

export type Evaluate = <T>(value: T | T[] | ((...x: any[]) => T)) => Evaluated<T>;

export function evaluateFactory<K>(expression: K, args: unknown[]) {
  return visit as Evaluate;

  function visit<T>(value: T | T[] | ((...x: any[]) => T)): Evaluated<T> | Evaluated<T>[] {
    if (isArray(value)) {
      return visitArray<T>(value as T[]);
    } else if (isFunction(value)) {
      return visitFunction<T>(value as ((...x: any[]) => T));
    } else if (isObject(value)) {
      return visitObject(value as T);
    }
    return value as Evaluated<T>;
  }

  function visitObject<T>(inst: T): Evaluated<T> {
    return (Object.keys(inst) as Array<keyof T>)
      .reduce((memo, key) => ({ ...memo, [key]: visit(inst[key]) }), {} as Evaluated<T>);
  }

  function visitArray<T>(list: T[]) {
    const result = [] as Evaluated<T>[];
    for (let i = 0, length = list.length; i < length; i++) {
      result[i] = visit(list[i]) as Evaluated<T>;
    }
    return result;
  }

  function visitFunction<T>(delegate: (...argums: any[]) => T): Evaluated<T> {
    return delegate.apply(expression, args) as Evaluated<T>;
  }
}
