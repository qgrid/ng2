import { assignWith, identity } from '../utility/kit';
import { Bag } from './bag';
import { Body, VirtualBody } from './body';
import { Data } from './data';
import { FakeLayer } from './fake/layer';
import { Foot } from './foot';
import { Head } from './head';
import { Lazy } from '../infrastructure/lazy';
import { View } from './view';

export class Table {
	constructor(model, box) {
		this.model = model;

		const { scroll } = model;
		const defaults = {
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
			},
			markup: {}
		};

		this.box = assignWith(defaults, box);

		this._data = new Lazy(() => new Data(model));
		this._view = new Lazy(() => new View(box, model));
		this._head = new Lazy(() => new Head(this.boxContext('head'), model));
		this._foot = new Lazy(() => new Foot(this.boxContext('foot'), model));
		this._body = new Lazy(() => {
			const context = this.boxContext('body');
			return scroll().mode === 'virtual'
				? new VirtualBody(context, model)
				: new Body(context, model)
		});
	}

	invalidate() {
		this.head.selector = this.head.selectFactory.create();
		this.body.selector = this.body.selectFactory.create();
		this.foot.selector = this.foot.selectFactory.create();
	}

	get view() {
		return this._view.instance;
	}

	get data() {
		return this._data.instance;
	}

	get head() {
		return this._head.instance;
	}

	get body() {
		return this._body.instance;
	}

	get foot() {
		return this._foot.instance;
	}

	boxContext(source) {
		const { view, data } = this;
		const { mapper, layer, bag, markup } = this.box;

		switch (source) {
			case 'body': {
				return {
					mapper,
					layer,
					bag: bag[source],
					view,
					data,
					markup
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
					data,
					markup
				};
			}
		}
	}
}