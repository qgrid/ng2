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
							items = this.makeArrayFromCells(items);
							break;
						}
						case 'row': {
							items = this.makeArrayFromRows(items);
							break;
						}
						case 'column': {
							items = this.makeArrayFromColumns(items);
							break;
						}

					}

					ClipboardService.buildTable(items);
					ClipboardService.selectTable(document.querySelector('.generatedTable'));

				},
				shortcut: shortcut.copy
			})
		};

		return new Map(
			Object.entries(commands)
		);
	}

	makeArrayFromColumns(items) {
		const dataState = this.model.data();
		const rows = dataState.rows;
		const accumulator = [];

		items.forEach((column, colIndex) => {
			const factory = getFactory(column);
			const cells = rows.map(row => factory(row));

			if (accumulator.length === 0) {
				cells.forEach(() => accumulator.push([]));
			}

			cells.forEach((cell, celIndex) => {
				accumulator[celIndex][colIndex] = cells[celIndex];
			})

		});

		return accumulator;
	}

	makeArrayFromCells(items) {
		const accumulator = [];
		let collection = [];
		let cells = [];

		items.forEach(item => {
			const column = item.column;
			const row = item.row;
			const key = column.key;

			if (collection.indexOf(key) === -1) {
				const value = get(row, column);
				cells.push(value);
				collection.push(key);
			} else {
				accumulator.push(cells);
				cells = [];
				collection = [];
				const value = get(row, column);
				cells.push(value);
				collection.push(key);
			}
		});

		accumulator.push(cells);

		return accumulator;
	}

	makeArrayFromRows(items) {
		const accumulator = [];

		items.forEach(item => {
			const values = Object.values(item);
			const collection = [];

			values.forEach(value => {
				extractData(value);

				function extractData(value) {
					const type = getType(value);

					switch (type) {
						case 'Object': {
							const entity = value;
							const values = Object.values(entity);

							values.forEach( value => {
								getType(value) === 'Object' ? extractData(value) : getType(value) === 'Array' ? extractData(value) : collection.push(value);
							});
							break;
						}
						case 'String': {
							collection.push(value);
							break;
						}
						case 'Array': {
							const str = value.join(', ');
							collection.push(str);
							break;
						}

					}
				}
			});

			accumulator.push(collection);
		});

		return accumulator;
	}
}
