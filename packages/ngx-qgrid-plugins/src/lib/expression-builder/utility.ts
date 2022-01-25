import { clone } from '@qgrid/core';

export function indexOf(array: any[], predicate: any) {
	for (let i = 0, length = array.length; i < length; i++) {
		if (predicate(array[i], i)) {
			return i;
		}
	}
	return -1;
}

export function defaults<T>(...args: any[]): T {
	const dst = args[0];
	const result: any = clone(dst) as T;

	for (let i = 1, sourcesLength = args.length; i < sourcesLength; i++) {
		const source = args[i];

		if (!source) {
			continue;
		}

		const keys = Object.keys(source);

		for (let k = 0, keysLength = keys.length; k < keysLength; k++) {
			const key = keys[k];
			if (!result.hasOwnProperty(key)) {
				result[key] = source[key];
			}
		}
	}

	return result;
}

export function override(dst: any, src: any) {
	const keys = Object.keys(src);
	const length = keys.length;

	for (let i = 0; i < length; i++) {
		const key = keys[i];
		dst[key] = src[key];
	}

	return dst;
}
