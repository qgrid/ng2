import {Unit} from './unit';
import {EventListener, EventManager} from '../infrastructure';
import {escapeClass} from '../services/css';

function isParentOf(parent, element) {
	while (element) {
		if (element === parent) {
			return true;
		}

		element = element.parentNode;
	}

	return false;
}

export class View extends Unit {
	constructor(markup, context) {
		super();

		this.markup = markup;
		this.context = context;
		this.layers = new Map();
	}

	focus() {
		const elements = this.getElementsCore('table');
		if (elements.length) {
			elements[0].focus();
			return true;
		}

		return false;
	}

	blur() {
		this.getElementsCore('table')
			.forEach(element => element.blur());
	}

	isFocused() {
		return this.getElementsCore('table')
			.some(element => this.isFocusedCore(element));
	}

	keyDown(f) {
		return new EventListener(this.markup.document, new EventManager(this)).on('keydown', f);
	}

	addLayer(name) {
		const layers = this.layers;
		if (layers.has(name)) {
			return layers.get(name);
		}

		const layer = this.context.layer(name);
		layers.set(name, layer);
		return layer;
	}

	removeLayer(name) {
		const layers = this.layers;
		if (layers.has(name)) {
			const layer = layers.get(name);
			layer.destroy();
			layers.delete(name);
			return true;
		}

		return false;
	}

	addClass(name) {
		if (this.markup.view) {
			this.markup.view.classList.add(escapeClass(name));
		}
	}

	removeClass(name) {
		if (this.markup.view) {
			this.markup.view.classList.remove(escapeClass(name));
		}
	}

	scrollLeft(value) {
		const markup = this.markup;
		if (arguments.length) {
			if (markup.head) {
				markup.head.scrollLeft = value;
			}

			if (markup.foot) {
				markup.foot.scrollLeft = value;
			}

			if (markup.body) {
				markup.body.scrollLeft = value;
			}
		}

		return this.getElement().scrollLeft;
	}

	scrollTop(value) {
		if (arguments.length) {
			this.getElementsCore('body')
				.forEach(element => element.scrollTop = value);
		}

		return this.getElement().scrollTop;
	}

	canScrollTo(element, direction) {
		if (element) {
			switch (direction) {
				case 'left': {
					element = element.element;
					if (element) {
						const markup = this.markup;
						if (markup.table) {
							return isParentOf(markup.table, element);
						}
					}
					break;
				}
				case 'top':
					return true;
			}
		}

		return false;
	}

	rect() {
		const markup = this.markup;
		if (markup.body) {
			return markup.body.getBoundingClientRect();
		}

		return super.rect();
	}

	getElementCore() {
		return this.markup.body;
	}

	isFocusedCore(target) {
		const markup = this.markup;
		let current = markup.document.activeElement;
		return isParentOf(target, current);
	}

	getElementsCore(key) {
		const markup = this.markup;
		return [`${key}-left`, key, `${key}-right`]
			.filter(key => markup.hasOwnProperty(key))
			.map(key => markup[key]);
	}
}