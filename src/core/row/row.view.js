import { PathService } from '../path/path.service';
import { Command } from '../command/command';
import { isNumber } from '../utility/kit';
import { GRID_PREFIX } from '../definition';

export class RowView {
	constructor(model, table, tagName) {
		this.model = model;
		this.tagName = tagName;

		const pathFinder = new PathService(table.context.bag.body);

		this.drop = new Command({
			source: 'row.view',
			canExecute: e => {
				if (e.action === 'end') {
					return true;
				}

				const oldIndex = e.dragData;
				const row = pathFinder.row(e.path);
				return !!row;
			},
			execute: e => {
				const oldIndex = e.dragData;
				switch (e.action) {
					case 'over': {
						const row = pathFinder.row(e.path);
						if (!e.inAreaY(row.element)) {
							return;
						}

						const newIndex = row.index;
						if (oldIndex !== newIndex) {
							if (model.scroll().mode === 'virtual') {
								const oldRow = table.body.row(oldIndex);
								oldRow.removeClass(`${GRID_PREFIX}-drag`);

								const newRow = table.body.row(newIndex);
								newRow.addClass(`${GRID_PREFIX}-drag`);
							}

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
							const { id } = model.data();
							const key = id.row(newIndex, tr.model);
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
					return index >= 0 && model.view().rows.length > index;
				}

				return false;
			}
		});

		this.resize = new Command({
			source: 'row.view'
		});

		model.dataChanged.on(e => {
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
		return this.model.row().canMove;
	}

	get canResize() {
		return this.model.row().canResize;
	}
}