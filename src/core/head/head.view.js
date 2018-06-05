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

		this.drop = new Command({
			source: 'head.view',
			canExecute: e => {
				const pathFinder = new PathService(table.context.bag.head);
				const cell = pathFinder.cell(e.event.path);
				return cell && cell.column.canMove;
			},
			execute: e => {
				const sourceKey = e.dragData;
				const pathFinder = new PathService(table.context.bag.head);
				const targetKey = pathFinder.cell(e.event.path).column.key;
				if (sourceKey !== targetKey) {
					const columnList = model.columnList;
					const indexMap = Array.from(columnList().index);

					let oldIndex = indexMap.indexOf(sourceKey);
					let newIndex = indexMap.indexOf(targetKey);
					if (oldIndex >= 0 && newIndex >= 0) {
						indexMap.splice(oldIndex, 1);
						indexMap.splice(newIndex, 0, sourceKey);
						columnList({ index: indexMap }, { source: 'head.view' });
					}
				}

				return sourceKey;
			}
		});

		this.drag = new Command({
			source: 'head.view',
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