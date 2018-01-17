import { PluginView } from '../plugin.view';
import { EventListener, EventManager } from '../../core/infrastructure';
import { GRID_PREFIX } from '../../core/definition';
import { Command } from '../../core/command/command';

export class ColumnSortView extends PluginView {
	constructor(model, context) {
		super(model);

		const column = context.column;
		const view = context.view;
		const element = context.element;
		const iconDesc = context.iconDesc;
		const iconAsc = context.iconAsc;

		const activeClass = `${GRID_PREFIX}-active`;
		const hideClass = `${GRID_PREFIX}-hide`;

		this.using(model.sortChanged.watch(e => {
			if (e.hasChanges('by')) {
				if (view.sort.order(column) < 0) {
					element.classList.remove(activeClass);
					element.classList.add(hideClass);

					iconAsc.classList.remove(activeClass);
					iconDesc.classList.remove(activeClass);
				} else {
					const direction = view.sort.direction(column);
					const oldIcon = direction === 'asc' ? iconDesc : iconAsc;
					const newIcon = direction === 'asc' ? iconAsc : iconDesc;

					element.classList.add(activeClass);
					element.classList.remove(hideClass);

					oldIcon.classList.remove(activeClass);
					newIcon.classList.add(activeClass);
				}
			}
		}));

		this.toggle = new Command({
			canExecute: () => column.canSort,
			execute: () => view.sort.toggle.execute(column)
		});
	}

	onClick() {
		if (this.toggle.canExecute()) {
			this.toggle.execute();
		}
	}
}
