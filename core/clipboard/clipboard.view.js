import {View} from '../view';
import {AppError} from '../infrastructure';
import {Command} from '../command';
import {selectionStateFactory as stateFactory} from './../selection/state';
import {SelectionRange} from './../selection/selection.range';
import {SelectionService} from './../selection/selection.service';
import {GRID_PREFIX} from '../definition';
import {getType, isUndefined} from '../utility';
import {SelectionCommandManager} from './../selection/selection.command.manager';

export class ClipboardView extends View {
	constructor(model, commandManager) {
		super(model);
		debugger;

		const selectionCommandManager = new SelectionCommandManager(model, commandManager);
		const shortcut = model.action().shortcut;
		const commands = this.commands;

		this.using(shortcut.register(selectionCommandManager, commands));
	}

	get commands() {
		const model = this.model;
		const shortcut = model.clipboard().shortcut;

		const commands = {
			copy: new Command({
				source: 'selection.view',
				canExecute: () => model.selection().items.length > 0,
				execute: () => {
					const items = model.selection().items;

					const temp = [];

					for (let i = 0; i < items.length; i++) {
						let item = items[i];
						let values = Object.values(item);

						let tempArr = [];

						for (let t = 0; t < values.length; t++) {
							let item = values[t];
							extractData(item);

							function extractData(item) {
								let type = getType(item);

								switch (type) {
									case 'Object': {
										let entity = item;
										let values = Object.values(entity);

										for (let j = 0; j < values.length; j++) {
											let val = values[j];
											getType(val) === 'Object'? extractData(val) : getType(val) === 'Array'? extractData(val) : tempArr.push(val);
										}
										break;
									}
									case 'String': {
										tempArr.push(item);
										break;
									}
									case 'Array': {
										let str = item.join(', ');
										tempArr.push(str);
										debugger;
									}

								}

							}
						}
						debugger;
						temp.push(tempArr);
					}

					this.buildTable(temp);
					this.selectTable(document.querySelector('.generatedTable'));

				},
				shortcut: shortcut.copy
			})
		};

		return new Map(
			Object.entries(commands)
		);
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
	}
}





