import { Bag } from '../dom/bag';
import { Table } from '../dom/table';
import { AppError } from '../infrastructure/error';
import { Model } from '../infrastructure/model';
import { GRID_PREFIX } from '../definition';
import { Shortcut } from '../shortcut/shortcut';
import { Fastdom } from '../services/fastdom';
import { Disposable } from '../infrastructure/disposable';

export class GridCtrl extends Disposable {
	constructor(model, context) {
		super();

		const grid = model.grid;
		if (grid().status === 'bound') {
			throw new AppError('grid', `Model is already used by grid "${grid().id}"`);
		}

		this.model = model;
		this.markup = { document };

		this.bag = {
			head: new Bag(),
			body: new Bag(),
			foot: new Bag()
		};

		const element = context.element;
		if (!element.id) {
			element.id = model.grid().id;
		}

		grid({ status: 'bound' }, { source: 'grid.ctrl' });

		const layerFactory = context.layerFactory(this.markup);
		const tableContext = {
			layer: name => layerFactory.create(name),
			bag: this.bag
		};

		this.table = new Table(model, this.markup, tableContext);

		model.sceneChanged.watch(e => {
			if (e.hasChanges('column')) {
				this.invalidateVisibility();
			}
		});
	}

	keyDown(e, source = 'grid') {
		const model = this.model;
		const { shortcut } = model.action();
		const result = shortcut.keyDown(e, source);
		if (result.length > 0) {
			e.preventDefault();
			e.stopPropagation();
			return result;
		}

		if (e.target.tagName === 'TBODY') {
			const code = Shortcut.translate(e);
			const { prevent } = model.navigation();
			if (prevent.has(code)) {
				e.preventDefault();
				e.stopPropagation();
			}
		}

		return result;
	}

	invalidateVisibility() {
		const { left, right } = this.model.scene().column.area;
		const { pinTop, pinBottom } = this.model.row();

		this.model.visibility({
			pin: {
				left: left.length > 0,
				right: right.length > 0,
				top: pinTop.length > 0,
				bottom: pinBottom.length > 0
			}
		}, {
				source: 'grid.ctrl'
			});
	}

	invalidateActive() {
		const activeClassName = `${GRID_PREFIX}-active`;
		const view = this.table.view;
		const model = this.model;
		if (view.isFocused()) {
			Fastdom.mutate(() => view.addClass(activeClassName));
			model.focus({ isActive: true }, { source: 'grid.ctrl' });
		}
		else {
			Fastdom.mutate(() => view.removeClass(activeClassName));
			model.focus({ isActive: false }, { source: 'grid.ctrl' });
		}
	}

	dispose() {
		super.dispose();

		this.model.grid({ status: 'unbound' }, { source: 'grid.ctrl' });
	}
}
