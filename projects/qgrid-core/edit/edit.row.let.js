import { Log } from '../infrastructure/log';
import { Command } from '../command/command';
import { RowEditor } from './edit.row.editor';
import { selectRow } from '../navigation/navigation.state.selector';

export class EditRowLet {
	constructor(plugin, shortcut) {
		this.plugin = plugin;
		this.editor = RowEditor.empty;

		const commands = this.getCommands();
		shortcut.register(commands);

		this.enter = commands.get('enter');
		this.commit = commands.get('commit');
		this.cancel = commands.get('cancel');
		this.reset = commands.get('reset');
	}

	getCommands() {
		const { model } = this.plugin;
		const commands = {
			enter: new Command({
				source: 'edit.row.view',
				shortcut: this.shortcutFactory('enter'),
				canExecute: row => {
					row = row || selectRow(model.navigation());
					return row
						&& model.edit().mode === 'row'
						&& model.edit().status === 'view'
						&& model.edit().enter.canExecute(this.contextFactory(row));
				},
				execute: (row, e) => {
					Log.info('row.edit', 'edit mode');
					if (e) {
						e.stopImmediatePropagation();
					}

					const columns = this.model.columnList().line;

					this.editor = new RowEditor(row, columns);
					model.edit({ status: 'edit' }, { source: 'edit.row.view' });
				}
			}),
			commit: new Command({
				source: 'edit.row.view',
				shortcut: this.shortcutFactory('commit'),
				// TODO: add validation support
				canExecute: row => {
					row = row || selectRow(model.navigation());
					return row
						&& model.edit().mode === 'row'
						&& model.edit().status === 'edit'
						&& model.edit().commit.canExecute(this.contextFactory(row));
				},
				execute: (cell, e) => {
					Log.info('row.edit', 'commit');
					if (e) {
						e.stopImmediatePropagation();
					}

					this.editor.commit();
					this.editor = RowEditor.empty;
					model.edit({ status: 'view' }, { source: 'edit.row.view' });
				}
			}),
			cancel: new Command({
				source: 'edit.row.view',
				shortcut: this.shortcutFactory('cancel'),
				canExecute: row => {
					row = row || selectRow(model.navigation());
					return row
						&& model.edit().mode === 'row'
						&& model.edit().status === 'edit'
						&& model.edit().cancel.canExecute(this.contextFactory(row));
				},
				execute: (row, e) => {
					Log.info('cell.edit', 'cancel');
					if (e) {
						e.stopImmediatePropagation();
					}

					this.editor.reset();
					this.editor = RowEditor.empty;
					model.edit({ status: 'view' }, { source: 'edit.row.view' });
				}
			}),
			reset: new Command({
				source: 'edit.row.view',
				canExecute: row => {
					row = row || selectRow(model.navigation());
					return row
						&& model.edit().mode === 'row'
						&& model.edit().status === 'edit'
						&& model.edit().reset.canExecute(this.contextFactory(row));
				},
				execute: (row, e) => {
					Log.info('row.edit', 'reset');
					if (e) {
						e.stopImmediatePropagation();
					}

					if (row && model.edit().reset.execute(this.contextFactory(row)) !== false) {
						this.editor.reset();
						return false;
					}
				}
			})
		};
		return new Map(
			Object.entries(commands)
		);
	}

	contextFactory(row) {
		return {
			row: row,
			unit: 'row'
		};
	}

	shortcutFactory(type) {
		const { model } = this.plugin;
		const { edit } = model;
		return () => {
			const shortcuts = edit()[type + 'Shortcuts'];
			return (shortcuts && shortcuts['row']) || shortcuts['$default'];
		};
	}
}
