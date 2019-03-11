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

export function eventPath(event) {
	const path = (event.composedPath && event.composedPath()) || event.path;
	const target = event.target;

	if (path) {
		// Safari doesn't include Window, but it should.
		return (path.indexOf(window) < 0) ? path.concat(window) : path;
	}

	if (target === window) {
		return [window];
	}

	return [target].concat(parents(target), window);
}

export function elementFromPoint(x, y) {
	return document.elementFromPoint(x, y);
}