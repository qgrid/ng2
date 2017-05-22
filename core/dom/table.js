import {View} from './view';
import {Data} from './data';
import {cellMapFactory} from './cell.map';
import {assignWith} from  '../services/utility';
import {FakeLayer} from './fake';
import {Head} from './head';
import {Body} from './body';
import {Foot} from './foot';

export class Table {
	constructor(model, markup, context = {}) {
		this.model = model;
		this.markup = markup;
		this.context = assignWith({
			mapper: cellMapFactory(model),
			layer: () => new FakeLayer(),
			model: () => null
		}, context);

		this._head = null;
		this._body = null;
		this._foot = null;
		this._view = null;
	}

	get head() {
		if (this._head) {
			return this._head;
		}

		return this._head = this.headCore();
	}

	get body() {
		if (this._body) {
			return this._body;
		}

		return this._body = this.bodyCore();
	}

	get foot() {
		if (this._foot) {
			return this._foot;
		}

		return this._foot = this.footCore();
	}

	get view() {
		if (this._view) {
			return this._view;
		}

		return this._view = this.viewCore();
	}

	get data() {
		return new Data(this.model);
	}

	headCore() {
		return new Head(this.context, this.model, this.markup);
	}

	bodyCore() {
		return new Body(this.context, this.model, this.markup);
	}

	footCore() {
		return new Foot(this.context, this.model, this.markup);
	}

	viewCore() {
		return new View(this.markup, this.context);
	}
}