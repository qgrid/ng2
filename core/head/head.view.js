import {View} from '../view';
import {Log} from '../infrastructure';
import {Command} from '../command';
import * as columnService from '../column/column.service';
import {FilterRowColumn} from '../column-type';
import {clone} from '../utility';

export class HeadView extends View {
	constructor(model, table, tagName) {
		super(model);

		this.table = table;
		this.tagName = tagName;
		this.rows = [];

		this.drop = new Command({
			canExecute: e => {
				if (e.source && e.source.key === tagName) {
					const key = e.target.value;
					const map = columnService.map(model.data().columns);
					return map.hasOwnProperty(key) && map[key].canMove;
				}

				return false;
			},
			execute: e => {
				const columnRows = model.scene().column.rows;
				for (let columns of columnRows) {
					const targetIndex = columns.findIndex(c => c.model.key === e.target.value);
					const sourceIndex = columns.findIndex(c => c.model.key === e.source.value);
					if (targetIndex >= 0 && sourceIndex >= 0) {
						const sourceColumn = columns[sourceIndex].model;
						const targetColumn = columns[targetIndex].model;
						const indexMap = Array.from(model.columnList().index);
						const sourceColumnIndex = indexMap.indexOf(sourceColumn.key);
						const targetColumnIndex = indexMap.indexOf(targetColumn.key);
						indexMap.splice(sourceColumnIndex, 1);
						indexMap.splice(targetColumnIndex, 0, sourceColumn.key);
						model.columnList({index: indexMap});
					}
				}
			}
		});

		this.drag = new Command({
			canExecute: e => {
				if (e.source.key === tagName) {
					const map = columnService.map(model.data().columns);
					return map.hasOwnProperty(e.source.value) && map[e.source.value].canMove !== false;
				}

				return false;
			}
		});

		this.resize = new Command({
			canExecute: e => {
				if (e.source.key === tagName) {
					const map = table.data.columnMap();
					return map.hasOwnProperty(e.source.value) && map[e.source.value].canResize !== false;
				}

				return false;
			}
		});

		this.filter = new Command({
			canExecute: () => true,
			execute: e => {
				const key = e.source.sourceKey;
				const filter = this.model.filter;
				const by = clone(filter().by);
				const search = e.search;
				if (search.length) {
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

				filter({by: by});
			}
		});

		this.using(model.sceneChanged.watch(e => {
			if (e.hasChanges('column')) {
				this.invalidate();
			}
		}));

		this.using(model.filterChanged.watch(e => {
			if (e.hasChanges('unit')) {
				this.invalidate();
			}
		}));
	}

	transfer(column) {
		return {
			key: this.tagName,
			value: column.key
		};
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