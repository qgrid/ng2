import {View} from '../view';
import {Command} from '../command';
import {getType, isUndefined} from '../utility';
import {SelectionCommandManager} from './../selection/selection.command.manager';
import {get, getFactory} from '../services/value';

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
							items = this.handleCell(items);
							break;
						}
						case 'row': {
							items = this.handleRow(items);
							break;
						}
						case 'column': {
							items = this.handleColumn(items);
							break;
						}

					}

					this.buildTable(items);
					this.selectTable(document.querySelector('.generatedTable'));

				},
				shortcut: shortcut.copy
			})
		};

		return new Map(
			Object.entries(commands)
		);
	}

	handleColumn(items) {
		const dataModel = this.model.data();
		const rows = dataModel.rows;
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

	handleCell(items) {
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

	handleRow(items) {
		const accumulator = [];
		debugger;

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

	buildTable(data) {
		const table = document.createElement('table');
		table.className = 'generatedTable';

		data.forEach((el) => {
			const tr = document.createElement('tr');
			for (let o in el) {
				const td = document.createElement('td');
				td.appendChild(document.createTextNode(el[o]));
				tr.appendChild(td);
			}
			table.appendChild(tr);
		});

		document.body.appendChild(table);

		return table;
	}

	selectTable(el) {
		let body = document.body, range, sel;

		if (document.createRange && window.getSelection) {
			range = document.createRange();
			sel = window.getSelection();
			sel.removeAllRanges();
			try {
				range.selectNodeContents(el);
				sel.addRange(range);
			} catch (e) {
				range.selectNode(el);
				sel.addRange(range);
			}
			document.execCommand('copy');

		} else if (body.createTextRange) {
			range = body.createTextRange();
			range.moveToElementText(el);
			range.select();
			range.execCommand('copy');
		}
		const table = document.querySelector('.generatedTable');

		table.remove();
	}
}





