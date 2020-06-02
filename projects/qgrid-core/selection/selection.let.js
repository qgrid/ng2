import { Command } from '../command/command';
import { GRID_PREFIX } from '../definition';
import { GridError } from '../infrastructure/error';
import { noop, isArray, isUndefined } from '../utility/kit';
import { SelectionRange } from './selection.range';
import { SelectionService } from './selection.service';
import { selectionStateFactory as formFactory } from './state/selection.state.factory';
import { selectRowIndex, selectColumnIndex, selectColumn } from '../navigation/navigation.state.selector';
import { SubjectLike } from '../rx/rx';

export class SelectionLet {
	constructor(plugin, shortcut) {
		const { model, table, observeReply } = plugin;

		this.plugin = plugin;
		this.selectionService = new SelectionService(model);
		this.form = formFactory(model, this.selectionService);
		this.selectionRange = new SelectionRange(model);

		const commands = this.getCommands();
		shortcut.register(commands);

		this.toggleRow = commands.get('toggleRow');
		this.toggleColumn = commands.get('toggleColumn');
		this.toggleCell = commands.get('toggleCell');
		this.reset = commands.get('reset');
		this.stateCheck = new SubjectLike();

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.tag.source === 'selection.view') {
					return;
				}

				if (e.hasChanges('cell')) {
					if (this.toggleCell.canExecute(e.state.cell)) {
						this.toggleCell.execute(e.state.cell);
					}
				}
			});

		const modeClass = `${GRID_PREFIX}-select-${model.selection().mode}`;
		const unitClass = `${GRID_PREFIX}-select-${model.selection().unit}`;

		const { view } = table;
		view.addClass(modeClass);
		view.addClass(unitClass);

		observeReply(model.selectionChanged)
			.subscribe(e => {
				if (e.hasChanges('mode')) {
					const newModeClass = `${GRID_PREFIX}-select-${e.state.mode}`;
					const oldModeClass = `${GRID_PREFIX}-select-${e.changes.mode.oldValue}`;

					view.removeClass(oldModeClass);
					view.addClass(newModeClass);
				}

				if (e.hasChanges('unit')) {
					const newUnitClass = `${GRID_PREFIX}-select-${e.state.unit}`;
					const oldUnitClass = `${GRID_PREFIX}-select-${e.changes.unit.oldValue}`;

					view.removeClass(oldUnitClass);
					view.addClass(newUnitClass);
				}

				if (e.hasChanges('unit') || e.hasChanges('mode')) {
					if (!e.hasChanges('items')) {
						this.form.clear();
						if (model.selection().items.length) {
							model.selection({ items: [] }, {
								source: 'selection.view'
							});
						}

						this.form = formFactory(model, this.selectionService);
					}
				}

				if (e.hasChanges('items')) {
					if (e.tag.source !== 'selection.view') {
						// Don't use commit it came outside already

						const oldEntries = this.selectionService.lookup(e.changes.items.oldValue);
						this.select(oldEntries, false);

						const newEntries = this.selectionService.lookup(e.state.items);
						this.select(newEntries, true);
					}

					this.stateCheck.next(e.state.items);
				}
			});
	}

	getCommands() {
		const { model, table } = this.plugin;
		const { shortcut } = model.selection();

		const toggleActiveRow = new Command({
			source: 'selection.view',
			canExecute: () => {
				const rowIndex = selectRowIndex(model.navigation());
				const row = this.rows[rowIndex >= 0 ? rowIndex : rowIndex + 1];

				if (!this.form.canSelect(row)) {
					return false;
				}

				return model.selection().unit === 'row' && this.rows.length > 0;
			},
			execute: () => {
				const rowIndex = selectRowIndex(model.navigation());
				const row = this.rows[rowIndex >= 0 ? rowIndex : rowIndex + 1];
				const commit = this.toggle(row);
				commit();
			},
			shortcut: shortcut.toggleRow
		});

		const commands = {
			toggleCell: new Command({
				source: 'selection.view',
				canExecute: item => {
					const selectionState = model.selection();
					return item && selectionState.mode !== 'range' && (selectionState.unit === 'cell' || selectionState.unit === 'mix');
				},
				execute: (item, source) => {
					const selectionState = model.selection();
					switch (selectionState.unit) {
						case 'cell': {
							const commit = this.toggle(item, source);
							commit();
							break;
						}
						case 'mix': {
							if (item.column.type === 'row-indicator') {
								const commit = this.toggle({ item: item.row, unit: 'row' }, source);
								commit();
								break;
							}
							else {
								const commit = this.toggle({ item: item, unit: 'cell' }, source);
								commit();
								break;
							}
						}
					}
				}
			}),
			toggleRow: new Command({
				source: 'selection.view',
				execute: (item, source) => {
					const commit = this.toggle(item, source);
					commit();
				},
				canExecute: row => {
					if (!this.form.canSelect(row)) {
						return false;
					}

					const e = {
						items: isUndefined(row)
							? model.scene().rows
							: [row],
						source: 'custom',
						kind: 'toggleRow'
					};

					if (!row) {
						return model.selection().toggle.canExecute(e) && this.mode === 'multiple';
					}

					return model.selection().toggle.canExecute(e);
				}
			}),
			toggleColumn: new Command({
				source: 'selection.view',
				execute: (item, source) => {
					const commit = this.toggle(item, source);
					commit();
				}
			}),
			commitRow: new Command({
				source: 'selection.view',
				canExecute: () => {
					const column = selectColumn(model.navigation());
					return column && column.type === 'select';
				},
				execute: () => {
					if (toggleActiveRow.canExecute()) {
						toggleActiveRow.execute();
					}
				},
				shortcut: model.edit().commitShortcuts['select'] || ''
			}),
			toggleActiveRow: toggleActiveRow,
			togglePrevRow: new Command({
				source: 'selection.view',
				canExecute: () => model.selection().unit === 'row' && selectRowIndex(model.navigation()) > 0,
				execute: () => {
					const rowIndex = selectRowIndex(model.navigation());
					const columnIndex = selectColumnIndex(model.navigation());

					const row = this.rows[rowIndex];
					const commit = this.toggle(row);
					commit();

					this.navigateTo(rowIndex - 1, columnIndex);
				},
				shortcut: shortcut.togglePreviousRow
			}),
			toggleNextRow: new Command({
				source: 'selection.view',
				canExecute: () => model.selection().unit === 'row' && selectRowIndex(model.navigation()) < this.rows.length - 1,
				execute: () => {
					const rowIndex = selectRowIndex(model.navigation());
					const columnIndex = selectColumnIndex(model.navigation());

					const row = this.rows[rowIndex];
					const commit = this.toggle(row);
					commit();

					this.navigateTo(rowIndex + 1, columnIndex);
				},
				shortcut: shortcut.toggleNextRow
			}),
			toggleActiveColumn: new Command({
				source: 'selection.view',
				canExecute: () => model.selection().unit === 'column' && selectColumnIndex(model.navigation()) >= 0,
				execute: () => {
					const columnIndex = selectColumnIndex(model.navigation());

					const column = this.columns[columnIndex];
					const commit = this.toggle(column);
					commit();
				},
				shortcut: shortcut.toggleColumn
			}),
			toggleNextColumn: new Command({
				source: 'selection.view',
				canExecute: () => model.selection().unit === 'column' && selectColumnIndex(model.navigation()) < this.columns.length - 1,
				execute: () => {
					const rowIndex = selectRowIndex(model.navigation());
					const columnIndex = selectColumnIndex(model.navigation());

					const column = this.columns[columnIndex];
					const commit = this.toggle(column);
					commit();

					this.navigateTo(rowIndex, columnIndex + 1);
				},
				shortcut: shortcut.toggleNextColumn
			}),
			togglePrevColumn: new Command({
				source: 'selection.view',
				canExecute: () => model.selection().unit === 'column' && selectColumnIndex(model.navigation()) > 0,
				execute: () => {
					const rowIndex = selectRowIndex(model.navigation());
					const columnIndex = selectColumnIndex(model.navigation());

					const column = this.columns[columnIndex];
					const commit = this.toggle(column);
					commit();

					this.navigateTo(rowIndex, columnIndex - 1);
				},
				shortcut: shortcut.togglePreviousColumn
			}),
			selectAll: new Command({
				source: 'selection.view',
				canExecute: () => {
					const { mode } = model.selection();
					return mode === 'multiple' || mode === 'range';
				},
				execute: () => {
					let entries = [];
					switch (model.selection().unit) {
						case 'row': {
							entries = this.rows;
							break;
						}
						case 'column': {
							entries = model.columnList().line;
							break;
						}
						case 'cell':
						case 'mix': {
							const { body } = table;

							const buildRange = this.selectionRange.build();
							const startCell = body.cell(0, 0);
							const endCell = body.cell(this.rows.length, this.columns.length);

							entries = buildRange(startCell, endCell);
							break;
						}
						default: {
							throw new GridError('selection.view', `Invalid unit ${model.selection().unit}`);
						}
					}

					const commit = this.select(entries, true);
					commit();
				},
				shortcut: shortcut.selectAll
			})
		};

		return new Map(
			Object.entries(commands)
		);
	}

	selectRange(startCell, endCell, source) {
		const buildRange = this.selectionRange.build();
		const range = buildRange(startCell, endCell);
		const commit = this.select(range, true, source);
		commit();
	}

	toggle(items, source = 'custom') {
		const { model } = this.plugin;
		const { toggle } = model.selection();

		items = !arguments.length || isUndefined(items)
			? this.rows
			: isArray(items)
				? items : [items];

		const e = { items, source, kind: 'toggle' };
		if (toggle.canExecute(e)) {
			toggle.execute(e);

			const { form } = this;
			form.toggle(items);

			return () => {
				model.selection({
					items: this.selectionService.map(form.entries())
				}, {
					source: 'selection.view'
				});
			};
		}

		return noop;
	}

	select(items, state, source = 'custom') {
		const { model } = this.plugin;
		const { toggle } = model.selection();
		const e = {
			items,
			source,
			kind: 'select'
		};

		if (toggle.canExecute(e)) {
			toggle.execute(e);

			this.form.select(items, state);

			return () => {
				const items = this.selectionService.map(this.form.entries());
				model.selection({ items }, {
					source: 'selection.view'
				});
			};
		} else {
			return noop;
		}
	}

	state(item) {
		if (!arguments.length) {
			return !!this.form.stateAll(this.rows);
		}

		return this.form.state(item) === true;
	}

	isIndeterminate(item) {
		if (!arguments.length) {
			return this.form.stateAll(this.rows) === null;
		}

		return this.form.state(item) === null;
	}

	get selection() {
		return this.plugin.model.selection();
	}

	get mode() {
		return this.selection.mode;
	}

	get items() {
		return this.selection.items;
	}

	get rows() {
		const { table } = this.plugin;
		return table.data.rows();
	}

	get columns() {
		const { table } = this.plugin;
		return table.data.columns();
	}

	navigateTo(rowIndex, columnIndex) {
		const { table, model } = this.plugin;
		const { row, column } = table.body.cell(rowIndex, columnIndex).model();
		model.navigation({
			cell: {
				rowIndex,
				columnIndex,
				row,
				column
			}
		}, { source: 'selection.view' });
	}
}
