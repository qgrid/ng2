import { Log } from '../infrastructure/log';
import { Command } from '../command/command';
import { Shortcut } from '../shortcut/shortcut';
import { CellEditor } from './edit.cell.editor';
import { getFactory as valueFactory } from '../services/value';
import { getFactory as labelFactory } from '../services/label';
import { parseFactory } from '../services/convert';
import * as validationService from '../validation/validation.service';

export class EditCellView {
	constructor(model, table, shortcut) {
		this.model = model;
		this.table = table;
		this.shortcut = shortcut;

		this.editor = CellEditor.empty;

		const commands = this.commands;

		shortcut.register(commands);

		this.enter = commands.get('enter');
		this.commit = commands.get('commit');
		this.push = commands.get('push');
		this.cancel = commands.get('cancel');
		this.reset = commands.get('reset');
		this.exit = commands.get('exit');
		this.clear = commands.get('clear');

		model.navigationChanged.watch(e => {
			if (e.hasChanges('cell')) {
				const oldCell = e.changes.cell.oldValue;
				if (oldCell && oldCell.column.editorOptions.trigger === 'focus') {
					if (this.commit.canExecute(oldCell)) {
						this.commit.execute(oldCell);
					}
				}

				const newCell = e.changes.cell.newValue;
				if (newCell && newCell.column.editorOptions.trigger === 'focus') {
					if (this.enter.canExecute(newCell)) {
						this.enter.execute(newCell);
					}
				}
			}
		});
	}

	mode(cell, value) {
		this.model.edit({ state: value });
		cell.mode(value);
	}

	get commands() {
		const model = this.model;
		const table = this.table;
		const commands = {
			enter: new Command({
				priority: 1,
				source: 'edit.cell.view',
				shortcut: this.shortcutFactory('enter'),
				canExecute: cell => {
					// TODO: source should be set up from outside
					const source = cell ? 'mouse' : 'keyboard';
					if (source === 'keyboard' && Shortcut.isControl(this.shortcut.keyCode())) {
						return false;
					}

					cell = cell || model.navigation().cell;
					return cell
						&& cell.column.canEdit
						&& (cell.column.class === 'control' || model.edit().mode === 'cell')
						&& model.edit().state === 'view'
						&& model.edit().enter.canExecute(this.contextFactory(cell));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'edit mode');
					if (e) {
						e.stopImmediatePropagation();
					}

					// TODO: source should be set up from outside
					const source = cell ? 'mouse' : 'keyboard';
					cell = cell || model.navigation().cell;
					if (cell && model.edit().enter.execute(this.contextFactory(cell, cell.value, cell.label)) !== false) {
						this.editor = new CellEditor(cell);
						const keyCode = this.shortcut.keyCode();
						if (source === 'keyboard' && Shortcut.isPrintable(keyCode)) {
							const parse = parseFactory(cell.column.type, cell.column.editor);
							const value = Shortcut.stringify(keyCode);
							const typedValue = parse(value);
							if (typedValue !== null) {
								this.value = typedValue;
							}
						}

						this.mode(cell, 'edit');
						return true;
					}

					return false;
				}
			}),
			commit: new Command({
				priority: 1,
				source: 'edit.cell.view',
				shortcut: this.shortcutFactory('commit'),
				canExecute: cell => {
					cell = cell || this.editor.cell;
					const canEdit = cell
						&& cell === this.editor.cell
						&& cell.column.canEdit
						&& (cell.column.class === 'control' || model.edit().mode === 'cell')
						&& model.edit().state === 'edit';
					if (canEdit) {
						const context = this.contextFactory(cell);
						const key = context.column.key;
						const validator = validationService.createValidator(model.validation().rules, key);
						return model.edit().commit.canExecute(context) && validator.validate({ [key]: this.value });
					}
					return false;
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'commit');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell;
					if (cell && model.edit().commit.execute(this.contextFactory(cell, this.value, this.label, this.tag)) !== false) {
						this.editor.commit();
						this.editor = CellEditor.empty;

						this.mode(cell, 'view');
						table.view.focus();

						return true;
					}

					return false;
				}
			}),
			push: new Command({
				priority: 1,
				source: 'edit.cell.view',

				canExecute: cell => {
					cell = cell || this.editor.cell;
					const canEdit = cell && cell.column.canEdit;
					if (canEdit) {
						const context = this.contextFactory(cell);
						const key = context.column.key;
						const validator = validationService.createValidator(model.validation().rules, key);
						return model.edit().commit.canExecute(context) && validator.validate({ [key]: this.value });
					}
					return false;
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'batch commit');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell;
					if (cell && model.edit().commit.execute(this.contextFactory(cell, this.value, this.label, this.tag)) !== false) {
						this.editor.commit();
						this.editor = CellEditor.empty;
						return true;
					}

					return false;
				}
			}),
			cancel: new Command({
				priority: 1,
				source: 'edit.cell.view',
				shortcut: this.shortcutFactory('cancel'),
				canExecute: cell => {
					cell = cell || this.editor.cell;
					return cell
						&& cell.column.canEdit
						&& (cell.column.class === 'control' || model.edit().mode === 'cell')
						&& model.edit().state === 'edit'
						&& model.edit().cancel.canExecute(this.contextFactory(cell, this.value, this.label));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'cancel');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell;
					if (cell && model.edit().cancel.execute(this.contextFactory(cell, cell.value, cell.label)) !== false) {
						this.editor.reset();
						this.editor = CellEditor.empty;

						this.mode(cell, 'view');
						table.view.focus();

						return true;
					}

					return false;
				}
			}),
			reset: new Command({
				priority: 1,
				source: 'edit.cell.view',
				canExecute: cell => {
					cell = cell || this.editor.cell;
					return cell
						&& cell.column.canEdit
						&& (cell.column.class === 'control' || model.edit().mode === 'cell')
						&& model.edit().state === 'edit'
						&& model.edit().reset.canExecute(this.contextFactory(cell, this.value, this.label));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'reset');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell;
					if (cell && model.edit().reset.execute(this.contextFactory(cell, this.value, this.label)) !== false) {
						this.editor.reset();
						return true;
					}

					return false;
				}
			}),
			exit: new Command({
				priority: 1,
				source: 'edit.cell.view',
				execute: (cell, e) => {
					Log.info('cell.edit', 'reset');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell;
					if (cell) {
						if (this.commit.canExecute(cell, e)) {
							const originValue = cell.value;
							const editValue = this.value;
							if (originValue !== editValue) {
								this.commit.execute(cell, e);
								return true;
							}
						}

						if (this.cancel.canExecute(cell, e)) {
							this.cancel.execute(cell, e);
							return true;
						}
					}

					return false;
				}
			}),
			clear: new Command({
				priority: 1,
				source: 'edit.cell.view',
				canExecute: cell => {
					cell = cell || this.editor.cell;
					return cell
						&& cell.column.canEdit
						&& (cell.column.class === 'control' || model.edit().mode === 'cell')
						&& model.edit().state === 'edit'
						&& model.edit().clear.canExecute(this.contextFactory(cell, this.value, this.label));
				},
				execute: (cell, e) => {
					Log.info('cell.edit', 'clear');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell;
					if (cell && model.edit().clear.execute(this.contextFactory(cell, this.value, this.label)) !== false) {
						this.editor.clear();
						return true;
					}

					return false;
				}
			}),
		};

		return new Map(
			Object.entries(commands)
		);
	}

	contextFactory(cell, value, label, tag) {
		const { column, row, columnIndex, rowIndex, value: oldValue, label: oldLabel } = cell;
		return {
			column,
			row,
			columnIndex,
			rowIndex,
			oldValue,
			newValue: arguments.length >= 2 ? value : oldValue,
			oldLabel,
			newLabel: arguments.length >= 3 ? label : oldLabel,
			unit: 'cell',
			tag,
			valueFactory,
			labelFactory
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

	get options() {
		return this.editor.options;
	}

	shortcutFactory(type) {
		const model = this.model;
		const edit = model.edit;
		return () => {
			const shortcuts = edit()[type + 'Shortcuts'];
			const cell = this.editor.cell;
			if (cell) {
				const type = cell.column && cell.column.editor ? cell.column.editor : cell.column.type;
				if (shortcuts.hasOwnProperty(type)) {
					return shortcuts[type];
				}
			}

			return shortcuts['$default'];
		};
	}
}
