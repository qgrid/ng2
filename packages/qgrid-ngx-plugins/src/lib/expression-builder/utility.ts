import { clone } from '@qgrid/core';

export function indexOf<T>(array: T[], predicate: (val: T, i: number) => boolean) {
  for (let i = 0, length = array.length; i < length; i++) {
    if (predicate(array[i], i)) {
      return i;
    }
  }
  return -1;
}

export function defaults<T>(dst?: T, ...args: Partial<T>[]): T {
  const result = clone(dst) as T;

  for (let i = 0, sourcesLength = args.length; i < sourcesLength; i++) {
    const source = args[i];

    if (!source) {
      continue;
    }

    const keys = Object.keys(source) as Array<keyof T>;

    for (let k = 0, keysLength = keys.length; k < keysLength; k++) {
      const key = keys[k];
      if (!Object.prototype.hasOwnProperty.call(result, key)) {
        result[key] = source[key];
      }
    }
  }

  return result;
}

export function override<T>(dst: T, src: Partial<T>): T {
  const keys = Object.keys(src) as Array<keyof T>;
  const length = keys.length;

  for (let i = 0; i < length; i++) {
    const key = keys[i];
    dst[key] = src[key];
  }

  return dst;
}
