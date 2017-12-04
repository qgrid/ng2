import { Table, Bag } from '../dom';
import { AppError } from '../infrastructure';
import { Model } from '../infrastructure';
import { GRID_PREFIX } from '../definition';
import { View } from '../view/view';
import { Shortcut } from '../shortcut/shortcut';

export class GridCtrl extends View {
	constructor(model, context) {
		super(model);

		if (model.grid().status === 'bound') {
			throw new AppError('grid', `Model is already used by grid "${model.grid().id}"`);
		}

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

		model.grid({ status: 'bound' });

		const layerFactory = context.layerFactory(this.markup);
		const tableContext = {
			layer: name => layerFactory.create(name),
			bag: this.bag
		};

		this.table = new Table(model, this.markup, tableContext);

		this.using(model.sceneChanged.watch(e => {
			if (e.hasChanges('column')) {
				this.invalidateVisibility();
			}
		}));
	}


	keyDown(e, source = 'grid') {
		const shortcut = this.model.action().shortcut;
		if (shortcut.keyDown(e, source)) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (e.target.tagName === 'TBODY') {
			const code = Shortcut.translate(e);
			if (code === 'space' || code === 'shift+space') {
				e.preventDefault();
			}
			return;
		}
	}

	invalidateVisibility() {
		const area = this.model.scene().column.area;
		const visibility = this.model.visibility;
		visibility({
			pin: {
				left: area.left.length,
				right: area.right.length
			}
		});
	}

	invalidateActive() {
		const activeClassName = `${GRID_PREFIX}-active`;
		const view = this.table.view;
		const model = this.model;
		if (view.isFocused()) {
			view.addClass(activeClassName);
			model.focus({ isActive: true });
		}
		else {
			view.removeClass(activeClassName);
			model.focus({ isActive: false });
		}
	}

	dispose() {
		super.dispose();

		this.model.grid({
			status: 'unbound'
		});

		Model.dispose(this.model, 'component');
	}
}
