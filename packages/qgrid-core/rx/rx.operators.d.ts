import { OperatorFunctionLike } from './rx';

export function takeOnce<T>(): OperatorFunctionLike<T, T>;
export function filter<T>(test: (x: T) => boolean): OperatorFunctionLike<T, T>;
