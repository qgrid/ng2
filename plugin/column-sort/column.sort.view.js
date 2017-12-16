import {PluginView} from '../plugin.view';
import {EventListener, EventManager} from '@grid/core/infrastructure';
import {GRID_PREFIX} from '@grid/core/definition';
import {Command} from '@grid/core/command/command';

export class ColumnSortView extends PluginView {
	constructor(model, context) {
		super(model);

		this.column = context.column;
		this.desc = context.iconDesc.style;
		this.asc = context.iconAsc.style;

		const element = context.element;
		const view = context.view;

		const display = this.desc.display;
		this.clear();

		this.using(model.sortChanged.watch(e => {
			if (e.hasChanges('by')) {
				this.clear();

				if (view.sort.order(this.column) >= 0) {
					this[view.sort.direction(this.column)].display = display;
					element.classList.add(`${GRID_PREFIX}-active`);
				}
				else {
					element.classList.remove(`${GRID_PREFIX}-active`);
				}
			}
		}));

		this.toggle = new Command({
			canExecute: () => this.column.canSort,
			execute: () => view.sort.toggle.execute(this.column)
		});

		const listener = new EventListener(element, new EventManager(this));
		this.using(listener.on('click', () => {
			if (this.toggle.canExecute()) {
				this.toggle.execute();
			}
		}));

		this.using(listener.on('mouseover', () => {
			if (model.drag().isActive) {
				return;
			}

			if (view.sort.order(this.column) < 0) {
				this.desc.display = display;
			}
		}));

		this.using(listener.on('mouseleave', () => {
			if (view.sort.order(this.column) < 0) {
				this.clear();
			}
		}));
	}

	clear() {
		this.desc.display = 'none';
		this.asc.display = 'none';
	}
}
