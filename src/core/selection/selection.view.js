import View from '../view/view';
import Command from 'core/infrastructure/command';
import stateFactory from './state/selection.state.factory';
import rangeBuilder from './range.build';
import Shortcut from 'core/infrastructure/shortcut';
import {GRID_PREFIX} from 'core/definition';
import {isUndefined} from 'core/services/utility';

export default class SelectionView extends View {
	constructor(model, table, applyFactory) {
		super(model);

		this.table = table;
		this.apply = applyFactory('async');

		this.selectionState = stateFactory(model);
		this.buildRange = rangeBuilder(model);

		const shortcut = new Shortcut(table, applyFactory('async'));
		const commands = this.commands;
		this.shortcutOff = shortcut.register('selectionNavigation', commands);
		this.toggleRow = commands.get('toggleRow');
		this.toggleColumn = commands.get('toggleColumn');
		this.toggleCell = commands.get('toggleCell');

		this.reset = commands.get('reset');

		model.sortChanged.watch(() => {
			this.selectionState = stateFactory(model);

			model.selection({items: this.selectionState.view});
		});

		model.navigationChanged.watch(e => {
			if (e.hasChanges('cell') && e.tag.source !== 'selection') {
				const selectionState = model.selection();
				if (selectionState.unit === 'cell' && selectionState.mode === 'single') {
					if (e.state.cell) {
						this.select(e.state.cell, true);
					}
				}
			}
		});

		model.selectionChanged.watch(e => {
			if (e.hasChanges('mode')) {
				this.apply(() => {
					const newClassName = `${GRID_PREFIX}-select-${model.selection().mode}`;
					const view = table.view;
					view.addClass(newClassName);

					if (e.changes.mode.oldValue != e.changes.mode.newValue) {
						const oldClassName = `${GRID_PREFIX}-select-${e.changes.mode.oldValue}`;
						view.removeClass(oldClassName);
					}
				});
			}

			if (e.hasChanges('unit') || e.hasChanges('mode')) {
				this.selectionState = stateFactory(model);

				model.navigation({cell: null}, {source: 'selection'});
				const entries = this.selectionState.entries();
				model.selection({
					entries: entries,
					items: this.selectionState.view(entries)
				});
			}

			if (e.tag.source !== 'toggle' && e.hasChanges('entries')) {
				this.select(model.selection().entries, true);
			}
		});
	}

	get commands() {
		const model = this.model;
		const table = this.table;
		const commands = {
			toggleRow: new Command({
				execute: (item, state) => {
					this.select(item, state);
				}
			}),
			toggleColumn: new Command({
				execute: (item, state) => {
					this.select(item, state);
				}
			}),
			toggleCell: new Command({
				execute: (item, state) => {
					this.select(item, state);
				}
			}),
			toggleActiveRow: new Command({
				shortcut: 'shift+space',
				execute: () => {
					const navState = model.navigation();
					const rowIndex = navState.rowIndex;

					let row;
					if (rowIndex >= 0) {
						row = this.rows[rowIndex];
					} else {
						row = this.rows[rowIndex + 1];
						model.navigation({
							cell: table.body.cell(rowIndex + 1, navState.columnIndex)
						}, {
							source: 'selection'
						});
					}

					this.select(row);
				},
				canExecute: () => model.selection().unit === 'row' && this.rows.length > 0
			}),
			togglePrevRow: new Command({
				shortcut: 'shift+up',
				execute: () => {
					const navState = model.navigation();
					const rowIndex = navState.rowIndex - 1;
					const row = this.rows[rowIndex];
					this.select(row);
					model.navigation({cell: table.body.cell(rowIndex, navState.columnIndex).model}, {source: 'selection'});
				},
				canExecute: () => model.selection().unit === 'row' && model.navigation().rowIndex > 0
			}),
			toggleNextRow: new Command({
				shortcut: 'shift+down',
				execute: () => {
					const navState = model.navigation();
					const rowIndex = navState.rowIndex + 1;
					const row = this.rows[rowIndex];
					this.select(row);
					model.navigation({cell: table.body.cell(rowIndex, navState.columnIndex).model}, {source: 'selection'});
				},
				canExecute: () => model.selection().unit === 'row' && model.navigation().rowIndex < this.rows.length - 1
			}),
			toggleActiveColumn: new Command({
				shortcut: 'ctrl+space',
				execute: () => {
					const columnIndex = model.navigation().columnIndex;
					const entries = Array.from(model.selection().entries);
					const column = this.columns[columnIndex].key;
					this.select([...entries, column]);
				},
				canExecute: () => model.selection().unit === 'column' && model.navigation().columnIndex >= 0
			}),
			toggleNextColumn: new Command({
				shortcut: 'shift+right',
				execute: () => {
					const navState = model.navigation();
					const columnIndex = navState.columnIndex + 1;
					const column = this.columns[columnIndex].key;
					this.select(column);
					model.navigation({cell: table.body.cell(navState.rowIndex, columnIndex).model}, {source: 'selection'});
				},
				canExecute: () => model.selection().unit === 'column' && model.navigation().columnIndex < this.columns().length - 1
			}),
			togglePrevColumn: new Command({
				shortcut: 'shift+left',
				execute: () => {
					const navState = model.navigation();
					const columnIndex = navState.columnIndex - 1;
					const column = this.columns[columnIndex].key;
					this.select(column);
					model.navigation({cell: table.body.cell(navState.rowIndex, columnIndex).model}, {source: 'selection'});
				},
				canExecute: () => model.selection().unit === 'column' && model.navigation().columnIndex > 0
			}),
			selectAll: new Command({
				shortcut: 'ctrl+a',
				execute: () => this.select(),
				canExecute: () => model.selection().mode === 'multiple'
			}),
			reset: new Command({
				execute: () => {
					this.reset();
				}
			})
		};

		return new Map(
			Object.entries(commands)
		);
	}

	selectRange(startCell, endCell) {
		const range = this.buildRange(startCell, endCell);
		this.select(range);
	}

	select(items) {
		if (arguments.length && !isUndefined(items)) {
			if (this.selection.mode === 'range') {
				this.selectionState.clear();
				this.selectionState.toggle(items, true);
			} else {
				this.selectionState.toggle(items);
			}
		}
		else {
			if (this.state() || this.model.selection().mode === 'single') {
				this.selectionState.clear();
			}
			else {
				this.selectionState.select(this.model.view().rows, true);
			}
		}

		const entries = this.selectionState.entries();
		this.model.selection({
			items: this.selectionState.view(entries),
			entries: entries,
		}, {source: 'toggle'});
	}

	state(item) {
		if (!arguments.length) {
			item = this.model.view().rows;
		}

		return this.selectionState.state(item) === true;
	}

	isIndeterminate(item) {
		if (!arguments.length) {
			item = this.model.view().rows;
		}

		return this.selectionState.state(item) === null;
	}

	destroy() {
		this.shortcutOff();
	}

	get selection() {
		return this.model.selection();
	}

	get rows() {
		return this.table.data.rows();
	}

	get columns() {
		return this.table.data.columns();
	}
}