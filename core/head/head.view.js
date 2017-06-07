import {View} from '../view';
import {Log, Command} from '../infrastructure';
import * as columnService from '../column/column.service';

export class HeadView extends View {
	constructor(model, table, tagName) {
		super(model);

		this.table = table;
		this.tagName = tagName;
		this.rows = [];

		this.drop = new Command({
			canExecute: e => {
                const key = e.key;
                const map = columnService.map(model.data().columns);
                return map.hasOwnProperty(key) && map[key].canMove;
			},
			execute: e => {
				const view = model.view;
				const columnRows = view().columns;
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
                const map = columnService.map(model.data().columns);
                return map.hasOwnProperty(e.key) && map[e.key].canMove !== false;
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

		model.viewChanged.watch(() => this.invalidate(model));
	}

	transfer(column) {
		return {
			key: this.tagName,
			value: column.key
		};
	}

	invalidate(model) {
		Log.info('view.head', 'invalidate');

		this.rows = model.view().columns;
	}
}
