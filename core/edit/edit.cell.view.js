import {Command, Log, Shortcut} from '../infrastructure';
import {CellEditor} from './edit.cell.editor';
import {getFactory as valueFactory} from '../services/value';
import {getFactory as labelFactory} from '../services/label';
import {Cell} from '../cell';

export class EditCellView {
	constructor(model, table, commandManager) {
		this.model = model;
		this.table = table;

		this.editor = CellEditor.empty;
		this.commandManager = commandManager;

		const shortcut = new Shortcut(commandManager);
		const commands = this.commands;
		this.shortcutOff = shortcut.register('editCellNavigation', commands);

		this.enter = commands.get('enter');
		this.commit = commands.get('commit');
		this.cancel = commands.get('cancel');
		this.reset = commands.get('reset');
	}

	get commands() {
		const model = this.model;
		const table = this.table;
		const commands = {
			enter: new Command({
				shortcut: 'F2|Enter',
				canExecute: cell => {
					cell = cell || model.navigation().cell;
					return cell
						&& cell.column.canEdit
						&& model.edit().mode === 'cell'
						&& model.edit().state === 'view'
						&& model.edit().enter.canExecute(this.contextFactory(cell));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'edit mode');
					if (e) {
						e.stopImmediatePropagation();
					}

					if (cell) {
						if (!Cell.equals(model.navigation().cell, cell)) {
							model.navigation({cell: new Cell(cell)});
						}
					}
					else {
						cell = model.navigation().cell;
					}

					if (cell && model.edit().enter.execute(this.contextFactory(cell, cell.value, cell.label)) !== false) {
						this.editor = new CellEditor(cell);
						model.edit({state: 'edit'});
						cell.mode('edit');
						return true;
					}

					return false;
				}
			}),
			commit: new Command({
				shortcut: this.commitShortcut.bind(this),
				// TODO: add validation support
				canExecute: cell => {
					cell = cell || this.editor.cell || model.navigation().cell;
					return cell
						&& cell.column.canEdit
						&& model.edit().mode === 'cell'
						&& model.edit().state === 'edit'
						&& model.edit().commit.canExecute(this.contextFactory(cell));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'commit');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell || model.navigation().cell;
					if (cell && model.edit().commit.execute(this.contextFactory(cell, this.value, this.label, this.tag)) !== false) {
						this.editor.commit();
						this.editor = CellEditor.empty;

						model.edit({state: 'view'});
						cell.mode('view');
						table.view.focus();
						return true;
					}

					return false;
				}
			}),
			cancel: new Command({
				shortcut: 'Escape',
				canExecute: cell => {
					cell = cell || this.editor.cell || model.navigation().cell;
					return cell
						&& cell.column.canEdit
						&& model.edit().mode === 'cell'
						&& model.edit().state === 'edit'
						&& model.edit().cancel.canExecute(this.contextFactory(cell, this.value, this.label));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'cancel');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell || model.navigation().cell;
					if (cell && model.edit().cancel.execute(this.contextFactory(cell, this.value, this.label)) !== false) {
						this.editor.reset();
						this.editor = CellEditor.empty;

						model.edit({state: 'view'});
						cell.mode('view');
						table.view.focus();
						return true;
					}

					return false;
				}
			}),
			reset: new Command({
				canExecute: cell => {
					cell = cell || this.editor.cell || model.navigation().cell;
					return cell
						&& cell.column.canEdit
						&& model.edit().mode === 'cell'
						&& model.edit().state === 'edit'
						&& model.edit().reset.canExecute(this.contextFactory(cell, this.value, this.label));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'reset');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell || model.navigation().cell;
					if (cell && model.edit().reset.execute(this.contextFactory(cell, this.value, this.label)) !== false) {
						this.editor.reset();
						return true;
					}

					return false;
				}
			})
		};
		return new Map(
			Object.entries(commands)
		);
	}

	contextFactory(cell, value, label, tag) {
		return {
			column: cell.column,
			row: cell.row,
			columnIndex: cell.columnIndex,
			rowIndex: cell.rowIndex,
			oldValue: cell.value,
			newValue: arguments.length >= 2 ? value : cell.value,
			oldLabel: cell.label,
			newLabel: arguments.length >= 3 ? label : cell.label,
			unit: 'cell',
			tag: tag,
			valueFactory: valueFactory,
			labelFactory: labelFactory
		};
	}

	get fetch() {
		return this.editor.fetch;
	}

	get value() {
		return this.editor.value;
	}

	set value(value) {
		this.editor.value = value;
	}

	get label() {
		return this.editor.label;
	}

	set label(label) {
		this.editor.label = label;
	}

	get column() {
		return this.editor.column;
	}

	canEdit(cell) {
		if (cell) {
			return cell.column.canEdit && this.model.edit().mode === 'cell';
		}

		return false;
	}

	commitShortcut() {
		const model = this.model;
		const commitShortcuts = model.edit().commitShortcuts;
		const cell = this.editor.cell || model.navigation().cell;
		if (cell && commitShortcuts.hasOwnProperty(cell.column.type)) {
			return commitShortcuts[cell.column.type];
		}

		return commitShortcuts['$default'];
	}

	get options() {
		return this.editor.options;
	}

	destroy() {
		this.editor.reset();
		this.shortcutOff();
	}
}