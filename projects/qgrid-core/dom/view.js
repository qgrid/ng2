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
	constructor(context, model) {
		super();

		this.context = context;
		this.model = model;
		this.layers = new Map();
	}

	columns() {
		const { column } = this.model.scene();
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
		return this.getElementsCore('body')
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
		const { markup } = this.context;
		if (markup.view) {
			markup.view.classList.add(escapeAttr(name));
		}
	}

	removeClass(name) {
		const { markup } = this.context;
		if (markup.view) {
			markup.view.classList.remove(escapeAttr(name));
		}
	}

	scrollLeft(value) {
		const { markup } = this.context;
		if (arguments.length) {
			const headMid = markup['head-mid'];
			if (headMid) {
				headMid.scrollLeft = value;
			}

			const footMid = markup['foot-mid'];
			if (footMid) {
				footMid.scrollLeft = value;
			}

			const bodyMid = markup['body-mid'];
			if (bodyMid) {
				bodyMid.scrollLeft = value;
			}

			const bodyTop = markup['body-top'];
			if (bodyTop) {
				bodyTop.scrollLeft = value;
			}

			const bodyBottom = markup['body-bottom'];
			if (bodyBottom) {
				bodyBottom.scrollLeft = value;
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

	scrollHeight() {
		return this.getElement().scrollHeight;
	}

	scrollWidth() {
		return this.getElement().scrollWidth;
	}

	canScrollTo(target, direction) {
		if (target && !(target.element instanceof FakeElement)) {
			switch (direction) {
				case 'left': {
					target = target.element;
					if (target) {
						const { markup } = this.context;
						const tableMid = markup['table-mid'];
						if (tableMid) {
							return isParentOf(tableMid, target);
						}
					}
					break;
				}
				case 'top': {
					return true;
				}
			}
		}

		return false;
	}

	rect(area = 'body-mid') {
		const { markup } = this.context;
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

	height(area = 'body-mid') {
		const { markup } = this.context;
		const element = markup[area];
		if (element) {
			return element.clientHeight;
		}

		return 0;
	}

	width(area = 'body-mid') {
		const { markup } = this.context;
		const element = markup[area];
		if (element) {
			return element.clientWidth;
		}

		return 0;
	}

	getElementCore() {
		const { markup } = this.context;
		return markup['body-mid'];
	}

	isFocusedCore(target) {
		const { markup } = this.context;
		const { activeElement } = markup.document;

		return isParentOf(target, activeElement);
	}

	getElementsCore(key) {
		const { markup } = this.context;
		return [`${key}-left`, `${key}-mid`, `${key}-right`]
			.filter(key => markup.hasOwnProperty(key))
			.map(key => markup[key]);
	}
}
