import {PluginView} from '../plugin.view';
import {EventListener, EventManager} from '../../core/infrastructure';
import {GRID_PREFIX} from '../../core/definition';
import {Command} from '../../core/command/command';

export class ColumnSortView extends PluginView {
	constructor(model, context) {
		super(model);

		this.column = context.column;
		this.desc = context.iconDesc.style;
		this.asc = context.iconAsc.style;

		const element = context.element;
		this.view = context.view;

		this.display = this.desc.display;
		this.clear();

		this.using(model.sortChanged.watch(e => {
			if (e.hasChanges('by')) {
				this.clear();

				const view = this.view;
				const display = this.display;
				const iconDesc = context.iconDesc;
				const iconAsc = context.iconAsc;
				const activeClass = `${GRID_PREFIX}-active`;
				
				if (view.sort.order(this.column) >= 0) {
					
					let icon = iconDesc;
					let direction = view.sort.direction(this.column);
					if (direction === 'asc') {
						iconAsc.classList.add(activeClass);
						iconDesc.classList.remove(activeClass);
					} else {
						iconAsc.classList.remove(activeClass);
						iconDesc.classList.add(activeClass);
					} 
					
					this[view.sort.direction(this.column)].display = display;
					element.classList.add(`${GRID_PREFIX}-active`);
				} else {
					element.classList.remove(`${GRID_PREFIX}-active`);
					
					iconAsc.classList.remove(activeClass);
					iconDesc.classList.remove(activeClass);
				}
			}
		}));

		this.toggle = new Command({
			canExecute: () => this.column.canSort,
			execute: () => this.view.sort.toggle.execute(this.column)
		});
	}

	onMouseOver() {
		const model = this.model;
		const view = this.view;

		if (model.drag().isActive) {
			return;
		}

		if (view.sort.order(this.column) < 0) {
			this.desc.display = this.display;
		}
	}

	onMouseLeave() {
		const view = this.view;

		if (view.sort.order(this.column) < 0) {
			this.clear();
		}
	}

	onClick() {
		if (this.toggle.canExecute()) {
			this.toggle.execute();
		}
	}

	clear() {
		this.desc.display = 'none';
		this.asc.display = 'none';
	}
}
