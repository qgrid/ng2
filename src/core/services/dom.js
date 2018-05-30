import { isUndefined } from '../utility/kit';

export function css(element, property, value) {
	const normalizedProperty = normalize(property);
	if (isUndefined(value)) {
		return element.style[normalizedProperty];
	} else {
		element.style[normalizedProperty] = value;
		return normalizedProperty;
	}
}

function normalize(property) {
	return property.replace(/-([a-z])/g, upperFirst);
}

function upperFirst(match, letter) {
	return letter.toUpperCase();
}

export function parents(element) {
	const path = [];
	while (element) {
		path.unshift(element);
		element = element.parentNode;
	}

	return path;
}
