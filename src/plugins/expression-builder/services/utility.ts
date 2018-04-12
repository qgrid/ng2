export function indexOf(array, predicate) {
	for (let i = 0, length = array.length; i < length; i++) {
		if (predicate(array[i], i)) {
			return i;
		}
	}
	return -1;
}

export function asArray(args) {
	return Array.prototype.slice.call(args);
}

export function clone(object) {
	const result = {};
	const keys = Object.keys(object);
	for (let i = 0, length = keys.length; i < length; i++) {
		const key = keys[i];
		result[key] = object[key];
	}

	return result;
}

export function defaults(dst) {
	const sourcesLength = arguments.length;
	const args = asArray(arguments);
	const result = clone(dst);

	for (let i = 1; i < sourcesLength; i++) {
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

export function isFunction(value) {
	return typeof value === 'function';
}

export function isObject(value) {
	return value !== null && typeof value === 'object';
}

export function override(dst, src) {
	const keys = Object.keys(src);
	const length = keys.length;

	for(let i = 0; i < length; i++) {
		const key = keys[i];
		dst[key] = src[key];
	}

	return dst;
}

export function identity() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}
