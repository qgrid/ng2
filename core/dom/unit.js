import {FakeElement} from './fake';
import {escapeClass} from '../services/css';

const fakeElement = new FakeElement();
export class Unit {
	constructor() {
	}

	rect() {
		return this.getElement().getBoundingClientRect();
	}

	addClass(name) {
		this.addClassCore(name);
	}

	removeClass(name) {
		this.removeClassCore(name);
	}

	hasClass(name) {
		return this.hasClassCore(name);
	}

	width() {
		return this.getElement().clientWidth;
	}

	height() {
		return this.getElement().clientHeight;
	}

	getElement() {
		return this.getElementCore() || fakeElement;
	}

	addClassCore(name) {
		this.getElement().classList.add(escapeClass(name));
	}

	removeClassCore(name) {
		this.getElement().classList.remove(escapeClass(name));
	}

	hasClassCore(name) {
		return this.getElement().classList.contains(name);
	}

	getElementCore() {
		return null;
	}
}