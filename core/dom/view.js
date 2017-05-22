import {Unit} from './unit';
import {EventListener} from '../infrastructure';

export class View extends Unit {
	constructor(markup, context) {
		super();

		this.markup = markup;
		this.context = context;
		this.layers = new Map();
	}

	focus() {
		this.markup.table.focus();
	}

	blur() {
		this.markup.table.blur();
	}

	isFocused() {
		const markup = this.markup;
		const target = markup.table;
		let current = markup.document.activeElement;
		while (current) {
			if (current === target) {
				return true;
			}

			current = current.parentNode;
		}

		return false;
	}

	keyDown(f) {
		return new EventListener(this, this.markup.document).on('keydown', f);
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

	addClass(name){
		if(this.markup.view){
			this.markup.view.classList.add(name);
		}
	}

	removeClass(name){
		if(this.markup.view) {
			this.markup.view.classList.remove(name);
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
		const markup = this.markup;
		const body = markup.body;
		if (arguments.length) {
			const bodyLeft = markup['body-left'];
			const bodyRight = markup['body-right'];
			if (bodyLeft) {
				bodyLeft.scrollTop = value;
			}

			if (body) {
				body.scrollTop = value;
			}

			if (bodyRight) {
				bodyRight.scrollTop = value;
			}
		}

		return this.getElement().scrollTop;
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
}