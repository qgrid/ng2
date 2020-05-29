import { PathService } from '../path/path.service';
import { Command } from '../command/command';
import { isNumber } from '../utility/kit';
import { GRID_PREFIX } from '../definition';
import { eventPath } from '../services/dom';

export class RowLet {
	constructor(plugin, tagName) {
		const { model, table, observe } = plugin;

		this.plugin = plugin;
		this.tagName = tagName;

		const pathFinder = new PathService(table.box.bag.body);

		this.drop = new Command({
			source: 'row.view',
			canExecute: e => {
				if (e.action === 'end') {
					return true;
				}

				const row = pathFinder.row(eventPath(e));
				return !!row;
			},
			execute: e => {
				const oldIndex = e.dragData;
				switch (e.action) {
					case 'over': {
						const row = pathFinder.row(eventPath(e));
						if (!e.inAreaY(row.element)) {
							return;
						}

						const newIndex = row.index;
						if (oldIndex !== newIndex) {
							const oldRow = table.body.row(oldIndex);
							oldRow.removeClass(`${GRID_PREFIX}-drag`);

							const newRow = table.body.row(newIndex);
							newRow.addClass(`${GRID_PREFIX}-drag`);

							const tr = table.body.row(oldIndex).model();
							const entries = [];
							for (let entry of model.rowList().index.entries()) {
								const index = entry[1];
								if (oldIndex < index && index <= newIndex) {
									entry[1] = index - 1;
								} else if (oldIndex > index && index >= newIndex) {
									entry[1] = index + 1;
								}

								entries.push(entry);
							}

							const index = new Map(entries);
							const { rowId } = model.data();
							const key = rowId(newIndex, tr.model);
							index.set(key, newIndex);
							model.rowList({ index }, { source: 'row.view' });

							e.dragData = newIndex;
						}
						break;
					}
					case 'drop':
					case 'end': {
						const oldRow = table.body.row(oldIndex);
						oldRow.removeClass(`${GRID_PREFIX}-drag`);
						break;
					}
				}
			}
		});

		this.drag = new Command({
			source: 'row.view',
			execute: e => {
				const index = e.data;
				const row = table.body.row(index);
				row.addClass(`${GRID_PREFIX}-drag`);
				const tr = row.model();
				if (tr) {
					return tr.element;
				}
			},
			canExecute: e => {
				if (isNumber(e.data)) {
					const index = e.data;
					return index >= 0 && model.scene().rows.length > index;
				}

				return false;
			}
		});

		this.resize = new Command({
			source: 'row.view'
		});

		observe(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					model.rowList({
						index: new Map(),
					}, {
						source: 'row.view',
						behavior: 'core'
					});
				}
			})
	}

	get canMove() {
		const { model } = this.plugin;
		return model.row().canMove;
	}

	get canResize() {
		const { model } = this.plugin;
		return model.row().canResize;
	}
}