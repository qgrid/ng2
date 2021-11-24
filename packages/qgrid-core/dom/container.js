import { escapeAttr } from '../services/css';
import { min, max } from '../utility/kit';
import { Guard } from '../infrastructure/guard';

export class Container {
	constructor(elements) {
		this.elements = elements;
	}

	getBoundingClientRect() {
		const rects = this.elements.map(element => element.getBoundingClientRect());
		const top = min(rects.map(r => r.top));
		const left = min(rects.map(r => r.left));
		const bottom = max(rects.map(r => r.bottom));
		const right = max(rects.map(r => r.right));
		return {
			height: bottom - top,
			width: right - left,
			top: top,
			left: left,
			right: right,
			bottom: bottom
		};
	}

	addClass(name) {
		this.elements.forEach(element => element.classList.add(escapeAttr(name)));
	}

	removeClass(name) {
		this.elements.forEach(element => element.classList.remove(escapeAttr(name)));
	}

	hasClass(name) {
		return this.elements.some(element => element.classList.contains(escapeAttr(name)));
	}

	get clientWidth() {
		return max(this.elements.map(element => element.clientWidth));
	}

	get clientHeight() {
		return max(this.elements.map(element => element.clientHeight));
	}

	get offsetWidth() {
		return max(this.elements.map(element => element.offsetWidth));
	}

	get offsetHeight() {
		return max(this.elements.map(element => element.offsetHeight));
	}

	get classList() {
		return {
			add: name => this.addClass(name),
			remove: name => this.removeClass(name),
			contains: name => this.hasClass(name)
		};
	}
}

export class TrContainer {
	constructor(elements) {
		this.elements = elements;
	}

	get index() {
		const tr = this.elements[0];
		Guard.notNull(tr, "tr");

		return tr.index;
	}

	get model() {
		const tr = this.elements[0];
		Guard.notNull(tr, "tr");

		return tr && tr.model;
	}

	get element() {
		const { elements } = this;
		if (elements.length > 1) {
			return new Container(elements.map(tr => tr.element));
		}

		const tr = this.elements[0];
		Guard.notNull(tr, "tr");

		return tr.element;
	}
}