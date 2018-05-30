import { View } from './view';
import { Data } from './data';
import { assignWith, identity } from '../utility/kit';
import { FakeLayer } from './fake/layer';
import { Head } from './head';
import { Body, VirtualBody } from './body';
import { Foot } from './foot';
import { Bag } from './bag';

export class Table {
	constructor(model, markup, context = {}) {
		this.model = model;
		this.markup = markup;

		this.context = assignWith({
			mapper: {
				rowToView: model.scroll().mode === 'virtual' ? index => index - model.scroll().cursor : identity,
				viewToRow: model.scroll().mode === 'virtual' ? index => index + model.scroll().cursor : identity,
				columnToView: identity,
				viewToColumn: identity
			},
			layer: () => new FakeLayer(),
			bag: {
				head: new Bag(),
				body: new Bag(),
				foot: new Bag()
			}
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
		const context = this.box('head');
		return new Head(context, this.model, this.markup);
	}

	bodyCore() {
		const context = this.box('body');
		if (this.model.scroll().mode === 'virtual') {
			return new VirtualBody(context, this.model, this.markup);
		}

		return new Body(context, this.model, this.markup);
	}

	footCore() {
		const context = this.box('foot');
		return new Foot(context, this.model, this.markup);
	}

	viewCore() {
		return new View(this.context, this.model, this.markup);
	}

	box(source) {
		const ctx = this.context;
		return {
			mapper: ctx.mapper,
			layer: ctx.layer,
			bag: ctx.bag[source],
			view: this.view,
			data: this.data
		};
	}
}