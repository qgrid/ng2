import { PathService } from '../path/path.service';
import { Log } from '../infrastructure/log';
import { Command } from '../command/command';
import * as columnService from '../column/column.service';
import { FilterRowColumn } from '../column-type/filter.row.column';
import { clone, isUndefined, isNumber } from '../utility/kit';
import { GRID_PREFIX } from '../definition';

export class HeadView {
	constructor(model, table, tagName) {
		this.model = model;
		this.table = table;
		this.tagName = tagName;
		this.rows = [];

		const pathFinder = new PathService(table.context.bag.head);

		this.drop = new Command({
			source: 'head.view',
			canExecute: e => {
				if (e.action === 'end') {
					return true;
				}

				const cell = pathFinder.cell(e.event.path);
				return cell && cell.column.canMove;
			},
			execute: e => {
				const sourceKey = e.dragData;
				switch (e.action) {
					case 'over': {
						const td = pathFinder.cell(e.event.path);
						const targetKey = td.column.key;
						if (sourceKey !== targetKey) {
							const { columnList } = model;
							const index = Array.from(columnList().index);

							const oldPos = index.indexOf(sourceKey);
							const newPos = index.indexOf(targetKey);
							if (oldPos >= 0 && newPos >= 0) {
								index.splice(oldPos, 1);
								index.splice(newPos, 0, sourceKey);
								columnList({ index }, { source: 'head.view' });
							}
						}
						break;
					}
					case 'end':
					case 'drop': {
						const { index } = model.columnList();
						let oldIndex = index.indexOf(sourceKey);
						if (oldIndex >= 0) {
							const oldColumn = table.body.column(oldIndex);
							oldColumn.removeClass(`${GRID_PREFIX}-drag`);
						}
						break;
					}
				}
			}
		});

		this.drag = new Command({
			source: 'head.view',
			execute: e => {
				const sourceKey = e.data;
				const { index } = model.columnList();
				const oldIndex = index.indexOf(sourceKey);
				if (oldIndex >= 0) {
					const oldColumn = table.body.column(oldIndex);
					oldColumn.addClass(`${GRID_PREFIX}-drag`);
				}
			},
			canExecute: e => {
				const sourceKey = e.data;
				const { columns } = model.view();
				const map = columnService.map(columns);
				return map.hasOwnProperty(sourceKey) && map[sourceKey].canMove;
			}
		});

		this.resize = new Command({
			source: 'head.view',
			canExecute: e => {
				const key = e.data;
				const map = table.data.columnMap();
				return map.hasOwnProperty(key) && map[key].canResize !== false;
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

		if (this.rows.length > 1) {
			this.table.view.addClass(`${GRID_PREFIX}-head-multi`);
		} else {
			this.table.view.removeClass(`${GRID_PREFIX}-head-multi`);
		}

		if (model.filter().unit === 'row') {
			const filterRow = this.table.data.columns().map(c => new FilterRowColumn(c));
			this.rows.push(filterRow);
		}
	}
}