import { GRID_PREFIX } from '../definition';
import { SelectionAllToggleCommand } from '../command-bag/selection.all.toggle.command';
import { SelectionCellToggleCommand } from '../command-bag/selection.cell.toggle.command';
import { SelectionColumnToggleActiveCommand } from '../command-bag/selection.column.toggle.active.command';
import { SelectionColumnToggleCommand } from '../command-bag/selection.column.toggle.command';
import { SelectionColumnToggleNextCommand } from '../command-bag/selection.column.toggle.next.command';
import { SelectionColumnTogglePreviousCommand } from '../command-bag/selection.column.toggle.previous.command';
import { SelectionRangeCommand } from '../command-bag/selection.range.command';
import { SelectionRowToggleActiveCommand } from '../command-bag/selection.row.toggle.active.command';
import { SelectionRowToggleCommand } from '../command-bag/selection.row.toggle.command';
import { SelectionRowTogglePreviousCommand } from '../command-bag/selection.row.toggle.previous.command';
import { SelectionService } from './selection.service';
import { SelectionSetCommand } from '../command-bag/selection.set.command';
import { selectionStateFactory as formFactory } from './state/selection.state.factory';
import { SelectionToggleCommand } from '../command-bag/selection.toggle.command';
import { SubjectLike } from '../rx/rx';

export class SelectionLet {
	constructor(plugin) {
		const { model, table, observeReply, commandPalette } = plugin;

		this.plugin = plugin;

		this.selectionService = new SelectionService(model);
		this.form = formFactory(model, this.selectionService);

		const selectionRange = new SelectionRangeCommand(plugin);
		const selectionSet = new SelectionSetCommand(plugin);
		const selectionToggle = new SelectionToggleCommand(plugin);
		const toggleAll = new SelectionAllToggleCommand(plugin);
		const toggleCell = new SelectionCellToggleCommand(plugin);
		const toggleColumn = new SelectionColumnToggleCommand(plugin);
		const toggleColumnActive = new SelectionColumnToggleActiveCommand(plugin);
		const toggleColumnNext = new SelectionColumnToggleNextCommand(plugin);
		const toggleColumnPrev = new SelectionColumnTogglePreviousCommand(plugin);
		const toggleRow = new SelectionRowToggleCommand(plugin);
		const toggleRowActive = new SelectionRowToggleActiveCommand(plugin);
		const toggleRowNext = new SelectionRowToggleNextCommand(plugin);
		const toggleRowPrev = new SelectionRowTogglePreviousCommand(plugin);

		commandPalette.register(selectionRange);
		commandPalette.register(selectionSet);
		commandPalette.register(selectionToggle);
		commandPalette.register(toggleAll);
		commandPalette.register(toggleCell);
		commandPalette.register(toggleColumn);
		commandPalette.register(toggleColumnActive);
		commandPalette.register(toggleColumnNext);
		commandPalette.register(toggleColumnPrev);
		commandPalette.register(toggleRow);
		commandPalette.register(toggleRowActive);
		commandPalette.register(toggleRowNext);
		commandPalette.register(toggleRowPrev);

		this.toggleRow = toggleRow;
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
	}

	state(item) {
		if (!arguments.length) {
			return !!this.form.stateAll(table.data.rows());
		}

		return this.form.state(item) === true;
	}

	isIndeterminate(item) {
		if (!arguments.length) {
			return this.form.stateAll(table.data.rows()) === null;
		}

		return this.form.state(item) === null;
	}

	get mode() {
		return this.selection.mode;
	}
}
