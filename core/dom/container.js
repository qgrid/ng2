import {Unit} from './unit';
import {min, max} from '../services/utility';

export class Container extends Unit {
	constructor(elements) {
		super();

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
			width: right - left
		};
	}

	addClass(name) {
		this.elements.forEach(element => element.classList.add(name));
	}

	removeClass(name) {
		this.elements.forEach(element => element.classList.remove(name));
	}

	get clientWidth() {
		return max(this.elements.map(element => element.clientWidth));
	}

	get clientHeight() {
		return max(this.elements.map(element => element.clientHeight));
	}

	get classList() {
		return {
			add: name => this.addClass(name),
			remove: name => this.removeClass(name)
		};
	}
}