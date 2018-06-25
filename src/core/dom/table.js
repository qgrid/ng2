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

		const { scroll } = model;
		this.context = assignWith({
			mapper: {
				rowToView: index => scroll().map.rowToView(index),
				viewToRow: index => scroll().map.viewToRow(index),
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

		this.head = this.headCore();
		this.body = this.bodyCore();
		this.foot = this.footCore();
	}

	get view() {
		if (this._view) {
			return this._view;
		}

		return this._view = new View(this.context, this.model, this.markup);
	}

	get data() {
		if (this._data) {
			return this._data;
		}

		return this._data = new Data(this.model);
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

	box(source) {
		const { view, data } = this;
		const { mapper, layer, bag } = this.context;

		switch (source) {
			case 'body': {
				return {
					mapper,
					layer,
					bag: bag[source],
					view,
					data
				};
			}
			default: {
				return {
					mapper: {
						rowToView: identity,
						viewToRow: identity,
						columnToView: identity,
						viewToColumn: identity
					},
					layer,
					bag: bag[source],
					view,
					data
				};
			}
		}
	}
}