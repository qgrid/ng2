import { Log } from '../infrastructure/log';
import { Command } from '../command/command';
import { RowEditor } from './edit.row.editor';

export class EditRowView {
	constructor(model, table, shortcut) {
		this.model = model;
		this.table = table;
		this.editor = RowEditor.empty;

		const commands = this.commands;
		shortcut.register(commands);

		this.enter = commands.get('enter');
		this.commit = commands.get('commit');
		this.cancel = commands.get('cancel');
		this.reset = commands.get('reset');
	}

	get commands() {
		const model = this.model;
		const commands = {
			enter: new Command({
				source: 'edit.row.view',
				shortcut: this.shortcutFactory('enter'),
				canExecute: row => {
					row = row || model.navigation().row;
					return row
						&& model.edit().mode === 'row'
						&& model.edit().state === 'view'
						&& model.edit().enter.canExecute(this.contextFactory(row));
				},
				execute: (row, e) => {
					Log.info('row.edit', 'edit mode');
					if (e) {
						e.stopImmediatePropagation();
					}

					const columns = this.model.columnList().line;

					this.editor = new RowEditor(row, columns);
					model.edit({ state: 'edit' }, { source: 'edit.row.view' });
				}
			}),
			commit: new Command({
				source: 'edit.row.view',
				shortcut: this.shortcutFactory('commit'),
				// TODO: add validation support
				canExecute: row => {
					row = row || model.navigation().row;
					return row
						&& model.edit().mode === 'row'
						&& model.edit().state === 'edit'
						&& model.edit().commit.canExecute(this.contextFactory(row));
				},
				execute: (cell, e) => {
					Log.info('row.edit', 'commit');
					if (e) {
						e.stopImmediatePropagation();
					}

					this.editor.commit();
					this.editor = RowEditor.empty;
					model.edit({ state: 'view' }, { source: 'edit.row.view' });
				}
			}),
			cancel: new Command({
				source: 'edit.row.view',
				shortcut: this.shortcutFactory('cancel'),
				canExecute: row => {
					row = row || model.navigation().row;
					return row
						&& model.edit().mode === 'row'
						&& model.edit().state === 'edit'
						&& model.edit().cancel.canExecute(this.contextFactory(row));
				},
				execute: (row, e) => {
					Log.info('cell.edit', 'cancel');
					if (e) {
						e.stopImmediatePropagation();
					}

					this.editor.reset();
					this.editor = RowEditor.empty;
					model.edit({ state: 'view' }, { source: 'edit.row.view' });
				}
			}),
			reset: new Command({
				source: 'edit.row.view',
				canExecute: row => {
					row = row || model.navigation().row;
					return row
						&& model.edit().mode === 'row'
						&& model.edit().state === 'edit'
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
		const edit = this.model.edit;
		return () => {
			const shortcuts = edit()[type + 'Shortcuts'];
			return shortcuts['row'] || shortcuts['$default'];
		};
	}
}
