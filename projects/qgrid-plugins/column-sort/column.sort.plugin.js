import { GRID_PREFIX } from '@qgrid/core/definition';
import { Command } from '@qgrid/core/command/command';
import { Fastdom } from '@qgrid/core/services/fastdom';

const GRID_ACTIVE_CLASS = `${GRID_PREFIX}-active`;
const GRID_HIDE_CLASS = `${GRID_PREFIX}-hide`;

export class ColumnSortPlugin {
	constructor(plugin, context) {
		const { model, observeReply, view } = plugin;
		const { column, iconDesc, iconAsc, element } = context;

		this.element = element;

		observeReply(model.sortChanged)
			.subscribe(e => {
				if (e.hasChanges('by')) {
					if (view.sort.order(column) < 0) {
						Fastdom.mutate(() => {
							element.classList.add(GRID_HIDE_CLASS);
							element.classList.remove(GRID_ACTIVE_CLASS);

							iconAsc.classList.remove(GRID_ACTIVE_CLASS);
							iconDesc.classList.remove(GRID_ACTIVE_CLASS);
						});
					} else {
						const direction = view.sort.direction(column);
						const oldIcon = direction === 'asc' ? iconDesc : iconAsc;
						const newIcon = direction === 'asc' ? iconAsc : iconDesc;

						Fastdom.mutate(() => {
							element.classList.add(GRID_ACTIVE_CLASS);
							element.classList.remove(GRID_HIDE_CLASS);

							oldIcon.classList.remove(GRID_ACTIVE_CLASS);
							newIcon.classList.add(GRID_ACTIVE_CLASS);
						});
					}
				}
			});

		this.toggle = new Command({
			canExecute: () => column.canSort,
			execute: () => view.sort.toggle.execute(column)
		});
	}

	click() {
		if (this.toggle.canExecute()) {
			this.toggle.execute();
			return true;
		}

		return false;
	}

	mouseLeave() {
		Fastdom.mutate(() => {
			this.element.classList.remove(GRID_HIDE_CLASS);
		});
	}
}
