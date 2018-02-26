import { PluginView } from '../plugin.view';
import { GRID_PREFIX } from '../../core/definition';
import { Command } from '../../core/command/command';

const GRID_ACTIVE_CLASS = `${GRID_PREFIX}-active`;
const GRID_HIDE_CLASS = `${GRID_PREFIX}-hide`;

export class ColumnSortView extends PluginView {
	constructor(model, context) {
		super(model);

		const column = context.column;
		const view = context.view;
		const element = this.element = context.element;
		const iconDesc = context.iconDesc;
		const iconAsc = context.iconAsc;

		this.using(model.sortChanged.watch(e => {
			if (e.hasChanges('by')) {
				if (view.sort.order(column) < 0) {
					element.classList.add(GRID_HIDE_CLASS);
					element.classList.remove(GRID_ACTIVE_CLASS);
					
					iconAsc.classList.remove(GRID_ACTIVE_CLASS);
					iconDesc.classList.remove(GRID_ACTIVE_CLASS);
				} else {
					const direction = view.sort.direction(column);
					const oldIcon = direction === 'asc' ? iconDesc : iconAsc;
					const newIcon = direction === 'asc' ? iconAsc : iconDesc;

					element.classList.add(GRID_ACTIVE_CLASS);
					element.classList.remove(GRID_HIDE_CLASS);

					oldIcon.classList.remove(GRID_ACTIVE_CLASS);
					newIcon.classList.add(GRID_ACTIVE_CLASS);
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

	onMouseLeave() {
		this.element.classList.remove(GRID_HIDE_CLASS);
	}
}
