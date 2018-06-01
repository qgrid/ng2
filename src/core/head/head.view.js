import { PathService } from '../path/path.service';
import { Log } from '../infrastructure/log';
import { Command } from '../command/command';
import * as columnService from '../column/column.service';
import { FilterRowColumn } from '../column-type/filter.row.column';
import { clone, isUndefined, isNumber } from '../utility/kit';

export class HeadView {
	constructor(model, table, tagName) {
		this.model = model;
		this.table = table;
		this.tagName = tagName;
		this.rows = [];

		let oldIndex = -1;
		this.drop = new Command({
			source: 'head.view',
			canExecute: e => {
				const newIndex = e.dragData;
				if (isNumber(oldIndex) && isNumber(newIndex)) {
					const { columns } = model.view();
					return oldIndex !== newIndex
						&& oldIndex >= 0
						&& newIndex >= 0
						&& columns.length > oldIndex
						&& columns.length > newIndex;
				}

				return false;
			},
			execute: e => {
				const newIndex = e.dragData;
				const { rows } = model.scene().column;
				const index = Array.from(model.columnList().index);
				for (let columns of rows) {
					const sourceColumn = columns[oldIndex].model;
					const targetColumn = columns[newIndex].model;
					const sourceIndex = index.indexOf(sourceColumn.key);
					const targetIndex = index.indexOf(targetColumn.key);
					index.splice(sourceIndex, 1);
					index.splice(targetIndex, 0, sourceColumn.key);
					model.columnList({ index });
				}

				oldIndex = newIndex;
				return newIndex;
			}
		});

		this.dragOver = new Command({
			source: 'head.view',
			canExecute: e => {
				const pathFinder = new PathService(table.context.bag.head);
				const cell = pathFinder.cell(e.event.path);
				return !!cell;
			},
			execute: e => {
				const pathFinder = new PathService(table.context.bag.head);
				const newIndex = pathFinder.cell(e.event.path).columnIndex;

				const index = Array.from(model.columnList().index);
				const { rows } = model.scene().column;
				for (let columns of rows) {
					const sourceColumn = columns[oldIndex].model;
					const targetColumn = columns[newIndex].model;
					const sourceIndex = index.indexOf(sourceColumn.key);
					const targetIndex = index.indexOf(targetColumn.key);
					index.splice(sourceIndex, 1);
					index.splice(targetIndex, 0, sourceColumn.key);
					model.columnList({ index });
				}

				oldIndex = newIndex;
				return newIndex;
			}
		});

		this.drag = new Command({
			source: 'head.view',
			canExecute: e => {
				if (isNumber(e.data)) {
					const index = e.data;
					return index >= 0 && model.view().columns.length > index;
				}

				return false;
			},
			execute: e => oldIndex = e.data
		});

		this.resize = new Command({
			source: 'head.view',
			canExecute: e => {
				if (e.source.key === tagName) {
					const map = table.data.columnMap();
					return map.hasOwnProperty(e.source.value) && map[e.source.value].canResize !== false;
				}

				return false;
			}
		});

		this.filter = new Command({
			source: 'head.view',
			canExecute: () => true,
			execute: (column, search) => {
				const filter = this.model.filter;
				const by = clone(filter().by);
				const key = column.key;
				if (!isUndefined(search) && search !== '') {
					by[key] = {
						expression: {
							kind: 'group',
							op: 'and',
							left: {
								kind: 'condition',
								left: key,
								op: 'like',
								right: search
							},
							right: null
						}
					};
				}
				else {
					delete by[key];
				}

				filter({ by });
			}
		});

		model.sceneChanged.watch(e => {
			if (e.hasChanges('column')) {
				this.invalidate();
			}
		});

		model.filterChanged.watch(e => {
			if (e.hasChanges('unit')) {
				this.invalidate();
			}
		});
	}

	columns(row, pin) {
		return row.filter(c => c.model.pin === pin);
	}

	invalidate() {
		Log.info('view.head', 'invalidate');

		const model = this.model;
		this.rows = Array.from(model.scene().column.rows);

		if (model.filter().unit === 'row') {
			const filterRow = this.table.data.columns().map(c => new FilterRowColumn(c));
			this.rows.push(filterRow);
		}
	}
}