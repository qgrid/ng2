import {FakeElement} from './fake';

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
		this.getElement().classList.add(name);
	}

	removeClassCore(name) {
		this.getElement().classList.remove(name);
	}

	getElementCore() {
		return null;
	}
}