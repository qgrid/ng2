import {Box} from './box';
import {Data} from './data';
import {Element} from './element';
import {EventListener} from '@grid/core/infrastructure';

export class Table {
  private headBox: Box;
  private bodyBox: Box;
  private footBox: Box;
  private viewElement: Element;
  private pin: string = null;

	constructor(private model,
              private markup) {
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
		return new EventListener(this, this.markup.document)
			.on('keydown', f);
	}

	get head() {
		if (this.headBox) {
			return this.headBox;
		}

		const document = this.markup.document;
		const head = this.markup.head;
		if (document && head) {
			return this.headBox = new Box(document, head, 'q-grid-core-head');
		}

		return Box.empty;
	}

	get body() {
		if (this.bodyBox) {
			return this.bodyBox;
		}

		const document = this.markup.document;
		const body = this.markup.body;
		if (document && body) {
			return this.bodyBox = new Box(document, body, 'q-grid-core-body');
		}
		return Box.empty;
	}

	get foot() {
		if (this.footBox) {
			return this.footBox;
		}

		const document = this.markup.document;
		const foot = this.markup.foot;
		if (document && foot) {
			return this.footBox = new Box(document, foot, 'q-grid-core-foot');
		}
		return Box.empty;
	}

	get data() {
		return new Data(this.model, this.pin);
	}

	get view() {
		if (this.viewElement) {
			return this.viewElement;
		}

		const view = this.markup.view;
		if (view) {
			return this.viewElement = new Element(view);
		}
		return Element.empty;
	}

	focus() {
		this.markup.table.focus();
	}

	blur() {
		this.markup.table.blur();
	}
}
