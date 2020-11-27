import { isUndefined } from '../utility/kit';
import { Log } from '../infrastructure/log';

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

export function selectText(element) {
	if (!element || !element.classList) {
		Log.warn('dom.service', 'Could not select text in element: Unknown node');
		return;
	}

	element.classList.add('q-grid-can-select-text');

	if (document.body.createTextRange) {
		const range = document.body.createTextRange();
		range.moveToElementText(element);
		range.select();
	} else if (window.getSelection) {
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(element);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		Log.warn('dom.service', 'Could not select text in element: Unsupported browser.');
	}
}

export function removeTextSelection(element) {
	if (window.getSelection) {
		const selection = window.getSelection();
		selection.removeAllRanges();	
	}
	if (element && element.classList) {
		element.classList.remove('q-grid-can-select-text');
	}
}