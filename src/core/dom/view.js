import { Unit } from './unit';
import { FakeElement } from './fake/element';
import { escapeAttr } from '../services/css';

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
	constructor(context, model, markup) {
		super();

		this.context = context;
		this.model = model;
		this.markup = markup;
		this.layers = new Map();
	}

	columns() {
		const column = this.model.scene().column;
		return column.line;
	}

	focus() {
		const elements = this.getElementsCore('body');
		if (elements.length) {
			elements[0].focus();
			return true;
		}

		return false;
	}

	blur() {
		this.getElementsCore('body')
			.forEach(element => element.blur());
	}

	isFocused() {
		return this.getElementsCore('view')
			.some(element => this.isFocusedCore(element));
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

	hasLayer(name) {
		return this.layers.has(name);
	}

	addClass(name) {
		if (this.markup.view) {
			this.markup.view.classList.add(escapeAttr(name));
		}
	}

	removeClass(name) {
		if (this.markup.view) {
			this.markup.view.classList.remove(escapeAttr(name));
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

			if (markup['body-top']) {
				markup['body-top'].scrollLeft = value;
			}

			if (markup['body-bottom']) {
				markup['body-bottom'].scrollLeft = value;
			}

			return;
		}

		return this.getElement().scrollLeft;
	}

	scrollTop(value) {
		if (arguments.length) {
			this.getElementsCore('body')
				.forEach(element => element.scrollTop = value);

			return;
		}

		return this.getElement().scrollTop;
	}

	scrollHeight(value) {
		if (arguments.length) {
			this.getElementsCore('body')
				.forEach(element => element.scrollTop = value);
			return;
		}

		return this.getElement().scrollHeight;
	}

	canScrollTo(target, direction) {
		if (target && !(target.element instanceof FakeElement)) {
			switch (direction) {
				case 'left': {
					target = target.element;
					if (target) {
						const markup = this.markup;
						if (markup.table) {
							return isParentOf(markup.table, target);
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

	rect(area = 'body') {
		const markup = this.markup;
		const element = markup[area];
		if (element) {
			// TODO: get rid of that
			const rect = element.getBoundingClientRect();

			// Get rect without scrolls
			const width = element.clientWidth;
			const height = element.clientHeight;
			const left = rect.left;
			const top = rect.top;
			const right = left + width;
			const bottom = top + height;
			return { left, top, right, bottom, width, height };
		}

		return super.rect();
	}

	height(area = 'body') {
		const markup = this.markup;
		const element = markup[area];
		if (element) {
			return element.clientHeight;
		}

		return 0;
	}

	width(area = 'body') {
		const markup = this.markup;
		const element = markup[area];
		if (element) {
			return element.clientWidth;
		}

		return 0;
	}

	getElementCore() {
		return this.markup.body;
	}

	isFocusedCore(target) {
		const markup = this.markup;
		const current = markup.document.activeElement;
		return isParentOf(target, current);
	}

	getElementsCore(key) {
		const markup = this.markup;
		return [`${key}-left`, key, `${key}-right`]
			.filter(key => markup.hasOwnProperty(key))
			.map(key => markup[key]);
	}
}
