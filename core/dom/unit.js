import {FakeElement} from './fake';

const fakeElement = new FakeElement();
export class Unit {
	constructor() {
	}

	rect() {
		return this.getElement().getBoundingClientRect();
	}

	addClass(name) {
		this.getElement().classList.add(name);
	}

	removeClass(name) {
		this.getElement().classList.remove(name);
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

	getElementCore() {
		return null;
	}
}