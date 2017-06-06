import {min, max} from '../utility';

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
		this.elements.forEach(element => element.classList.add(name));
	}

	removeClass(name) {
		this.elements.forEach(element => element.classList.remove(name));
	}

	hasClass(name) {
		return this.elements.some(element => element.classList.contains(name));
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
			remove: name => this.removeClass(name),
			contains: name => this.hasClass(name)
		};
	}
}