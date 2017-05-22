import {Unit} from './unit';
import {min, max} from '../services/utility';

export class Container extends Unit {
	constructor(elements) {
		super();

		this.elements = elements;
	}

	rect() {
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

	width() {
		return this.elements.max(element => element.clientWidth);
	}

	height() {
		return this.elements.max(element => element.clientHeight);
	}
}