import { Resource } from '../../core/resource/resource';
import { cloneDeep, isArray, isObject, isDate, isBoolean, isNumber, isFunction } from '../../core/utility/kit';

export class DataManipulationModel {
	constructor() {
		this.resource = new Resource();

		this.deleted = new Set();
		this.added = new Set();
		this.edited = new Map();

		this.rowFactory = etalonRow => {
			if (etalonRow) {
				return cloneDeep(etalonRow, value => {
					if (isArray(value)) {
						return [];
					}

					if (!isObject(value) ||
						isNumber(value) ||
						isDate(value) ||
						isBoolean(value) ||
						isFunction(value)) {
						return null;
					}
				});
			}
		};

		this.addMode = 'top'; // top | bottom

		this.styleRow = (row, context) => {
			const rowId = this.rowId(context.row, row);
			const { deleted } = this;
			if (deleted.has(rowId)) {
				context.class('deleted', { opacity: 0.3 });
			}
		};

		this.styleCell = (row, column, context) => {
			const rowId = this.rowId(context.row, row);
			const { deleted, edited, added } = this;
			if (column.type === 'row-indicator') {
				if (deleted.has(rowId)) {
					context.class('delete-indicator', { background: '#EF5350' });
				}
				else if (added.has(rowId)) {
					context.class('add-indicator', { background: '#C8E6C9' });
				}
				else if (edited.has(rowId)) {
					context.class('edit-indicator', { background: '#E3F2FD' });
				}

				return;
			}

			if (edited.has(rowId)) {
				const entries = edited.get(rowId);
				if (entries.findIndex(entry => entry.column === this.columnId(context.column, column)) >= 0) {
					context.class('edited', { background: '#E3F2FD' });
				}
			}
		};

		this.delete = new Command({
			source: 'data.manipulation',
			canExecute: e => {
				const { id } = e.model.data();
				const rowId = id.row(e.rowIndex, e.row);
				const { deleted } = this;

				return !deleted.has(rowId);
			},
			execute: e => {
				const { data } = e.model;
				const { id, rows } = data();
				const { added, deleted } = this;

				const rowId = id.row(e.rowIndex, e.row);
				if (added.has(rowId)) {
					added.delete(rowId);

					data({
						rows: rows.filter((row, i) => id.row(i, row) !== rowId)
					}, {
							source: 'data.manipulation'
						});
				}
				else {
					deleted.add(rowId);
				}
			}
		});

		this.restore = new Command({
			source: 'data.manipulation',
			execute: e => {
				const { data, columnList } = e.model;
				const { id } = data();
				const rowId = id.row(e.rowIndex, e.row);
				const { deleted, edited } = this;
				if (deleted.has(rowId)) {
					deleted.delete(rowId);
				}

				if (edited.has(rowId)) {
					try {
						const edits = edited.get(rowId);
						const columnMap = columnService.map(columnList().line);
						for (const edit of edits) {
							const column = columnMap[edit.column];
							if (!column) {
								throw new AppError('data.manipulation', `Column ${edit.column} is not found`);
							}

							setValue(e.row, column, edit.oldValue);
							setLabel(e.row, column, edit.oldLabel);
						}
					}
					finally {
						edited.delete(rowId);
					}
				}
			},
			canExecute: e => {
				const { id } = e.model.data();
				const { edited } = this;
				const rowId = id.row(e.rowIndex, e.row);
				return deleted.has(rowId) || edited.has(rowId);
			}
		});

		this.add = new Command({
			source: 'data.manipulation',
			execute: e => {
				const { model } = e;
				const { id, rows } = model.data();
				const { added } = this;

				const newRow = this.rowFactory(rows[0]);
				if (isUndefined(newRow)) {
					throw new AppError('data.manipulation', 'Setup rowFactory property to add new rows');
				}

				const rowId = id.row(0, newRow);

				added.add(rowId);
				data({
					rows: [newRow].concat(rows)
				}, {
						source: 'data.manipulation'
					});
			},
			shortcut: 'F7'
		});
	}
}