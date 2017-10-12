import {Log} from '../infrastructure';
import {Command} from '../command';
import {Shortcut} from '../shortcut';
import {CellEditor} from './edit.cell.editor';
import {getFactory as valueFactory} from '../services/value';
import {getFactory as labelFactory} from '../services/label';
import {parseFactory} from '../services';
import {View} from '../view';

export class EditCellView extends View {
	constructor(model, table, commandManager) {
		super();

		this.model = model;
		this.table = table;

		this.editor = CellEditor.empty;
		this.commandManager = commandManager;

		this.shortcut = model.action().shortcut;
		const commands = this.commands;
		this.shortcutOff = this.shortcut.register(commandManager, commands);

		this.enter = commands.get('enter');
		this.commit = commands.get('commit');
		this.cancel = commands.get('cancel');
		this.reset = commands.get('reset');

		this.using(model.navigationChanged.watch(e => {
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
		}));
	}

	get commands() {
		const model = this.model;
		const table = this.table;
		const commands = {
			enter: new Command({
				shortcut: this.shortcutFactory('enter'),
				canExecute: cell => {
					// TODO: source should be set up from outside
					const source = cell ? 'mouse' : 'keyboard';
					if (source === 'keyboard' && Shortcut.isControl(this.shortcut.keyCode)) {
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
						if (source === 'keyboard' && Shortcut.isPrintable(this.shortcut.keyCode)) {
							const parse = parseFactory(cell.column.type);
							const value = Shortcut.stringify(this.shortcut.keyCode);
							const typedValue = parse(value);
							if (typedValue !== null) {
								this.value = typedValue;
							}
						}

						model.edit({ state: 'edit' });
						cell.mode('edit');
						return true;
					}

					return false;
				}
			}),
			commit: new Command({
				shortcut: this.shortcutFactory('commit'),
				// TODO: add validation support
				canExecute: cell => {
					cell = cell || this.editor.cell;
					return cell
						&& cell === this.editor.cell
						&& cell.column.canEdit
						&& (cell.column.class === 'control' || model.edit().mode === 'cell')
						&& model.edit().state === 'edit'
						&& model.edit().commit.canExecute(this.contextFactory(cell));
				},
				execute: (cell, e, timeout) => {
					Log.info('cell.edit', 'commit');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell;
					if (cell && model.edit().commit.execute(this.contextFactory(cell, this.value, this.label, this.tag)) !== false) {
						this.editor.commit();
						this.editor = CellEditor.empty;
						model.edit({ state: 'view' });

						const toggleMode = () => {
							cell.mode('view');
							table.view.focus();
						};

						if (timeout) {
							setTimeout(toggleMode, timeout);
						}
						else {
							toggleMode();
						}
						return true;
					}

					return false;
				}
			}),
			cancel: new Command({
				shortcut: this.shortcutFactory('cancel'),
				canExecute: cell => {
					cell = cell || this.editor.cell;
					return cell
						&& cell.column.canEdit
						&& (cell.column.class === 'control' || model.edit().mode === 'cell')
						&& model.edit().state === 'edit'
						&& model.edit().cancel.canExecute(this.contextFactory(cell, this.value, this.label));
				},
				execute: (cell, e, timeout) => {
					Log.info('cell.edit', 'cancel');
					if (e) {
						e.stopImmediatePropagation();
					}

					cell = cell || this.editor.cell;
					if (cell && model.edit().cancel.execute(this.contextFactory(cell, cell.value, cell.label)) !== false) {
						this.editor.reset();
						this.editor = CellEditor.empty;

						model.edit({ state: 'view' });
						const toggleMode = () => {
							cell.mode('view');
							table.view.focus();
						};

						if (timeout) {
							setTimeout(toggleMode, timeout);
						}
						else {
							toggleMode();
						}

						return true;
					}

					return false;
				}
			}),
			reset: new Command({
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

	dispose() {
		super.dispose();

		this.editor.reset();
		this.shortcutOff();
	}
}