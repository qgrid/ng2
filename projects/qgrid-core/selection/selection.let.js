import { GRID_PREFIX } from '../definition';
import { SELECTION_CELL_TOGGLE_COMMAND_KEY, SELECTION_ROW_TOGGLE_COMMAND_KEY, SELECTION_SET_COMMAND_KEY } from '../command-bag/command.bag';
import { SelectionService } from './selection.service';
import { selectionStateFactory as formFactory } from './state/selection.state.factory';
import { SubjectLike } from '../rx/rx';

export class SelectionLet {
	constructor(plugin) {
		const { model, table, observeReply, commandPalette } = plugin;

		this.plugin = plugin;

		const toggleCell = commandPalette.get(SELECTION_CELL_TOGGLE_COMMAND_KEY);
		const selectionSet = commandPalette.get(SELECTION_SET_COMMAND_KEY);
	
		this.selectionService = new SelectionService(model);
		this.form = formFactory(model, this.selectionService);
	
		this.toggleRow = commandPalette.get(SELECTION_ROW_TOGGLE_COMMAND_KEY);
		this.stateCheck = new SubjectLike();

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.tag.source === 'selection.let') {
					return;
				}

				if (e.hasChanges('cell')) {
					if (toggleCell.canExecute(e.state.cell) === true) {
						toggleCell.execute(e.state.cell);
					}
				}
			});

		const modeClass = `${GRID_PREFIX}-select-${model.selection().mode}`;
		const unitClass = `${GRID_PREFIX}-select-${model.selection().unit}`;

		table.view.addClass(modeClass);
		table.view.addClass(unitClass);

		observeReply(model.selectionChanged)
			.subscribe(e => {
				if (e.hasChanges('mode')) {
					const newModeClass = `${GRID_PREFIX}-select-${e.state.mode}`;
					const oldModeClass = `${GRID_PREFIX}-select-${e.changes.mode.oldValue}`;

					table.view.removeClass(oldModeClass);
					table.view.addClass(newModeClass);
				}

				if (e.hasChanges('unit')) {
					const newUnitClass = `${GRID_PREFIX}-select-${e.state.unit}`;
					const oldUnitClass = `${GRID_PREFIX}-select-${e.changes.unit.oldValue}`;

					table.view.removeClass(oldUnitClass);
					table.view.addClass(newUnitClass);
				}

				if (e.hasChanges('unit') || e.hasChanges('mode')) {
					if (!e.hasChanges('items')) {
						this.form.clear();
						if (model.selection().items.length) {
							model.selection({ items: [] }, {
								source: 'selection.let'
							});
						}

						this.form = formFactory(model, this.selectionService);
					}
				}

				if (e.hasChanges('items')) {
					if (e.tag.source !== 'selection.let') {
						// Don't use commit it came outside already

						const oldEntries = this.selectionService.lookup(e.changes.items.oldValue);
						selectionSet.execute([oldEntries, false]);

						const newEntries = this.selectionService.lookup(e.state.items);
						selectionSet.execute([newEntries, false]);
					}

					this.stateCheck.next(e.state.items);
				}
			});

		// observeReply(model.dataChanged)
		// 	.subscribe(e => {
		// 		// TODO: make it better
		// 		if (e.hasChanges('rows') && model.selection().unit === 'row') {
		// 			model.selection({ items: [] }, {
		// 				source: 'selection.let'
		// 			});
		// 		}

		// 		if (e.hasChanges('columns') && model.selection().unit === 'column') {
		// 			model.selection({ items: [] }, {
		// 				source: 'selection.let'
		// 			});
		// 		}
		// 	});
	}

	state(item) {
		if (!arguments.length) {
			const { table } = this.plugin;
			return !!this.form.stateAll(table.data.rows());
		}

		return this.form.state(item) === true;
	}

	isIndeterminate(item) {
		if (!arguments.length) {
			const { table } = this.plugin;
			return this.form.stateAll(table.data.rows()) === null;
		}

		return this.form.state(item) === null;
	}

	get mode() {
		const { model } = this.plugin;
		return model.selection().mode;
	}
}
