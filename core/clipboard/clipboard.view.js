import {View} from '../view';
import {Command} from '../command';
import {getType, isUndefined} from '../utility';
import {SelectionCommandManager} from './../selection/selection.command.manager';
import {get, getFactory} from '../services/value';
import {ClipboardService} from './clipboard.service';

export class ClipboardView extends View {
	constructor(model, commandManager) {
		super(model);

		const selectionCommandManager = new SelectionCommandManager(model, commandManager);
		const shortcut = model.action().shortcut;
		const commands = this.commands;

		this.using(shortcut.register(selectionCommandManager, commands));
	}

	get commands() {
		const model = this.model;
		const selection = model.selection();
		const shortcut = model.clipboard().shortcut;

		const commands = {
			copy: new Command({
				source: 'clipboard.view',
				canExecute: () => selection.items.length > 0,
				execute: () => {
					const unit = selection.unit;
					let items = selection.items;

					switch (unit) {
						case 'cell': {
							items = this.buildFromCells(items);
							break;
						}
						case 'row': {
							items = this.buildFromRows(items);
							break;
						}
						case 'column': {
							items = this.buildFromColumns(items);
							break;
						}

					}

					ClipboardService.buildTable(items);
					ClipboardService.selectTable(document.querySelector('.q-grid-generated-table'));

				},
				shortcut: shortcut.copy
			})
		};

		return new Map(
			Object.entries(commands)
		);
	}

	buildFromColumns(items) {
		const dataState = this.model.data();
		const dataRows = dataState.rows;
		const rows = [];

		items.forEach((column, colIndex) => {
			const factory = getFactory(column);
			const cells = dataRows.map(row => factory(row));

			if (rows.length === 0) {
				cells.forEach(() => rows.push([]));
			}

			cells.forEach((cell, celIndex) => {
				rows[celIndex][colIndex] = cells[celIndex];
			})

		});

		return rows;
	}

	buildFromCells(items) {
		const rows = [];
		let row = [];
		let keys = [];

		items.forEach(item => {
			const columnItem = item.column;
			const rowItem = item.row;
			const key = columnItem.key;

			if (keys.indexOf(key) === -1) {
				const value = get(rowItem, columnItem);
				row.push(value);
				keys.push(key);
			} else {
				rows.push(row);
				row = [];
				keys = [];
				const value = get(rowItem, columnItem);
				row.push(value);
				keys.push(key);
			}
		});

		rows.push(row);

		return rows;
	}

	buildFromRows(items) {
		const rows = [];

		items.forEach(item => {
			const values = Object.values(item);
			const row = [];

			values.forEach(value => {
				extractData(value);

				function extractData(value) {
					const type = getType(value);

					switch (type) {
						case 'Object': {
							const entity = value;
							const values = Object.values(entity);

							values.forEach(value => {
								getType(value) === 'Object' ? extractData(value) : getType(value) === 'Array' ? extractData(value) : row.push(value);
							});
							break;
						}
						case 'String': {
							row.push(value);
							break;
						}
						case 'Array': {
							const str = value.join(', ');
							row.push(str);
							break;
						}

					}
				}
			});

			rows.push(row);
		});

		return rows;
	}
}
