import {isObject, isArray} from '../utility';

function flattenObject(obj, separator = ', ') {
	const result = {};

	for (let [prop, value] of Object.entries(obj)) {
		if (isArray(value)) {
			const items = [];
			for (let item of value) {
				items.push(item);
			}
			result[prop] = items.join(separator);
		} else if (isObject(value)) {
			const flatObject = flattenObject(value);
			for (let [flatProp, flatValue] of Object.entries(flatObject)) {
				result[prop + '.' + flatProp] = flatValue;
			}
		} else {
			result[prop] = value;
		}
	}
	return result;
}

export {
	flattenObject
};
