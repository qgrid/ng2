import { isUndefined, identity } from '../utility/kit';
import { GridError } from '../infrastructure/error';
import { getFactory } from '../services/value';

function hashColumnKeyFactory(model) {
	const { columnKey } = model.selection();
	if (columnKey === identity) {
		return column => column.key;
	}

	// TODO: investigate if is it necessary to use JSON.stringify here
	return identity;
}

function hashRowKeyFactory(model) {
	const { rowKey } = model.selection();
	if (rowKey === identity) {
		const { rows } = model.data();
		const columns = model.columnList().line;
		const index = columns.findIndex(column => column.type === 'id');
		if (index >= 0) {
			const idColumn = columns[index];
			const getId = getFactory(idColumn);
			return getId;
		}

		return row => rows.indexOf(row);
	}

	// TODO: investigate if is it necessary to use JSON.stringify here
	return identity;
}

function hashKeyFactory(model) {
	const selectionState = model.selection();
	switch (selectionState.unit) {
		case 'row':
			return hashRowKeyFactory(model);
		case 'column':
			return hashColumnKeyFactory(model);
		case 'cell': {
			const hashColumnKey = hashColumnKeyFactory(model);
			const hashRowKey = hashRowKeyFactory(model);
			return key => `${hashColumnKey(key.column)}[${hashRowKey(key.row)}]`;
		}
		case 'mix': {
			const hashColumnKey = hashColumnKeyFactory(model);
			const hashRowKey = hashRowKeyFactory(model);
			return (key, entry) => {
				if (!entry.unit) {
					return key;
				}

				switch (entry.unit) {
					case 'column':
						return hashColumnKey(key);
					case 'row':
						return hashRowKey(key);
					case 'cell':
						return `${hashColumnKey(key.column)}[${hashRowKey(key.row)}]`;
					default:
						throw new GridError('selection.service', `Invalid unit ${entry.unit}`);
				}
			};
		}
		default:
			throw new GridError('selection.service', `Invalid unit ${selectionState.unit}`);
	}
}

function cellMatchFactory() {
	return (x, y) => x.column === y.column && x.row === y.row;
}

function keySelector(unit, rowKey, columnKey) {
	switch (unit) {
		case 'row':
			return rowKey;
		case 'column':
			return columnKey;
		case 'cell':
			return entry => {
				if (entry.row && entry.column) {
					return {
						row: rowKey(entry.row),
						column: columnKey(entry.column)
					};
				}

				return entry;
			};
		default:
			throw new GridError('selection.state', `Invalid unit ${unit}`);
	}
}

function lookupColumnFactory(model, selectKey) {
	const { columnKey } = model.selection();
	if (columnKey === identity) {
		return identity;
	}

	const columns = model.columnList().line;
	return items => {
		const result = [];
		columns.forEach(column => {
			const columnKey = selectKey(column);
			const found = items.indexOf(columnKey) > -1;
			if (found) {
				result.push(column);
			}
		});

		return result;
	};
}

function lookupRowFactory(model, selectKey) {
	const { rowKey } = model.selection();
	if (rowKey === identity) {
		return identity;
	}

	const { rows } = model.data();
	return items => {
		const result = [];
		rows.forEach(row => {
			const rowKey = selectKey(row);
			const found = items.indexOf(rowKey) > -1;
			if (found) {
				result.push(row);
			}
		});

		return result;
	};
}

function lookupCellFactory(model, selectKey) {
	const { rowKey, columnKey } = model.selection();
	if (rowKey === identity && columnKey === identity) {
		return identity;
	}

	const { rows } = model.data();
	const columns = model.columnList().line;
	const match = cellMatchFactory();
	return items => {
		const result = [];
		columns.forEach(column => {
			rows.forEach(row => {
				const cell = {
					column: column,
					row: row
				};

				const index = items.findIndex(item => match(item, selectKey(cell)));
				if (index >= 0) {
					result.push(cell);
				}
			});
		});
		return result;
	};
}

export class SelectionService {
	constructor(model) {
		this.model = model;
	}

	lookup(items, unit) {
		let entries = [];
		if (items.length === 0) {
			return entries;
		}

		const { model } = this;
		if (isUndefined(unit)) {
			unit = model.selection().unit;
		}

		switch (unit) {
			case 'column': {
				const selectKey = this.keyFactory('column');
				const lookup = lookupColumnFactory(model, selectKey);
				entries = lookup(items);
				break;
			}
			case 'row': {
				const selectKey = this.keyFactory('row');
				const lookup = lookupRowFactory(model, selectKey);
				entries = lookup(items);
				break;
			}
			case 'cell': {
				const selectKey = this.keyFactory('cell');
				const lookup = lookupCellFactory(model, selectKey);
				entries = lookup(items);
				break;
			}
			case 'mix': {
				const rowKeys = items.filter(key => key.unit === 'row').map(key => key.item);
				const columnKeys = items.filter(key => key.unit === 'column').map(key => key.item);
				const cellKeys = items.filter(key => key.unit === 'cell').map(key => key.item);

				entries.push(...this.lookup(rowKeys, 'row').map(entry => ({ item: entry, unit: 'row' })));
				entries.push(...this.lookup(columnKeys, 'column').map(entry => ({ item: entry, unit: 'column' })));
				entries.push(...this.lookup(cellKeys, 'cell').map(entry => ({ item: entry, unit: 'cell' })));
				break;
			}
			default:
				throw new GridError('selection.state', `Invalid unit ${unit}`);
		}

		return entries;
	}

	map(entries) {
		const selectionState = this.model.selection();
		const selectKey = this.keyFactory();
		switch (selectionState.unit) {
			case 'column':
			case 'row':
			case 'cell':
				return entries.map(selectKey);
			case 'mix':
				return entries.map(entry => ({
					unit: entry.unit,
					item: selectKey(entry)
				}));
			default:
				throw new GridError('selection.state', `Invalid unit ${selectionState.unit}`);
		}
	}

	keyFactory(selectionUnit) {
		const { rowKey, columnKey, unit } = this.model.selection();

		selectionUnit = selectionUnit || unit;
		switch (selectionUnit) {
			case 'column':
			case 'row':
			case 'cell':
				return keySelector(selectionUnit, rowKey, columnKey);
			case 'mix': {
				const selectCellKey = keySelector('cell', rowKey, columnKey);
				const selectRowKey = keySelector('row', rowKey, columnKey);
				const selectColumnKey = keySelector('column', rowKey, columnKey);

				return entry => {
					if (!entry.unit) {
						return identity;
					}

					switch (entry.unit) {
						case 'column':
							return selectColumnKey(entry.item);
						case 'row':
							return selectRowKey(entry.item);
						case 'cell':
							return selectCellKey(entry.item);
						default:
							throw new GridError('selection.service', `Invalid unit ${entry.unit}`);
					}
				};
			}
			default:
				throw new GridError('selection.service', `Invalid unit ${selectionUnit}`);
		}
	}

	hashFactory() {
		const selectKey = this.keyFactory();
		const selectHash = hashKeyFactory(this.model);
		return entry => {
			const key = selectKey(entry);
			const hashKey = selectHash(key, entry);
			return hashKey;
		};
	}
}
