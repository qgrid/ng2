export class ElementCore {
	constructor() {
	}

	get model() {
		return null;
	}

	rect() {
		return {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			width: 0,
			height: 0
		};
	}

	addClass() {
	}

	removeClass() {
	}

	get width() {
		return 0;
	}

	get height() {
		return 0;
	}
}
const empty = new ElementCore();
export class Element {
	constructor(protected element: HTMLElement) {
	}

	static get empty() {
		return empty;
	}

	rect() {
		return this.element.getBoundingClientRect();
	}

	addClass(name) {
		this.element.classList.add(name);
	}

	removeClass(name) {
		this.element.classList.remove(name);
	}

	get width() {
		return this.element.clientWidth;
	}

	get height() {
		return this.element.clientHeight;
	}
}
