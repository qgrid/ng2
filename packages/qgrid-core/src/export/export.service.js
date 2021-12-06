import { isArray, isObject } from '../utility/kit';

function graphFlatView(graph, separator = ', ') {
	const result = {};

	for (let [prop, value] of Object.entries(graph)) {
		if (isArray(value)) {
			const items = [];
			for (let item of value) {
				items.push(item);
			}
			result[prop] = items.join(separator);
		} else if (isObject(value)) {
			const flatObject = graphFlatView(value, separator);
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
  graphFlatView
};
