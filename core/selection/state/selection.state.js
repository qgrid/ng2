import {AppError} from '../../infrastructure';
import {isArray, isUndefined} from '../../services/utility';
import {Node} from '../../node';

const keySelector = (unit, selector) => {
	switch (unit) {
		case 'row':
			return selector.row;
		case 'column':
			return selector.column;
		case 'cell':
			return entry => ({
				row: selector.row(entry.row),
				column: selector.column(entry.column)
			});
		default:
			throw new AppError('selection.state', `Invalid unit ${unit}`);
	}
};

const stringifyCellKey = (key) => {
	return `${key.column}[${key.row}]`;
};

export class SelectionState {
	constructor(model) {
		this.model = model;
	}

	select(item, state = true) {
		if (isArray(item)) {
			item.forEach(item => this.select(item, state));
			return;
		}

		if (item instanceof Node) {
			const rows = this.model.data().rows;
			item.rows.forEach(index => this.select(rows[index], state));
			return;
		}

		this.selectCore(item, state);
	}

	toggle(item, state) {
		if (isUndefined(state)) {
			state = this.state(item);
			return this.select(item, state === null || !state);
		}

		return this.select(item, state);
	}

	state(item) {
		if (isArray(item)) {
			const all = item.every(item => this.state(item));
			return all ? true : item.some(item => this.state(item)) ? null : false;
		}

		if (item instanceof Node) {
			const rows = this.model.data().rows;
			const all = item.rows.every(index => this.state(rows[index]));
			return all ? true : item.rows.some(index => this.state(rows[index])) ? null : false;
		}

		return this.stateCore(item);
	}

	clear() {
		return this.clearCore();
	}

	view(entries) {
		const selectionState = this.model.selection();
		switch (selectionState.unit) {
			case 'row':
			case 'column':
			case 'cell':
				return entries.map(keySelector(selectionState.unit, selectionState.key));
			case 'mix':
				return entries.map(entry => ({
					unit: entry.unit,
					item: keySelector(entry.unit, selectionState.key)(entry.item)
				}));
			default:
				throw new AppError('selection.state', `Invalid unit ${selectionState.unit}`);
		}
	}

	entries() {
		return [];
	}

	key(item) {
		const selection = this.model.selection();
		const unit = selection.unit;
		const getCellKey = (item, unit) => {
			if (item.column && item.row) {
				const key = keySelector(unit, selection.key)(item);
				return stringifyCellKey(key);
			}

			return item;
		};

		if (unit === 'cell') {
			return getCellKey(item, unit);
		}

		if (unit === 'row' || unit === 'column') {
			return keySelector(unit, selection.key)(item);
		}

		if (unit === 'mix' && item.item) {
			if (item.unit === 'cell') {
				return getCellKey(item.item, item.unit);
			}

			if (item.unit === 'row' || item.unit === 'column') {
				return keySelector(item.unit, selection.key)(item.item);
			}

			return item.item;
		}

		return item;
	}

	lookup(items, unit) {
		const entries = [];

		if (items.length === 0) {
			return entries;
		}

		if (isUndefined(unit)) {
			unit = this.model.selection().unit;
		}
		const data = this.model.data();

		switch (unit) {
			case 'row': {
				const rows = data.rows;
				rows.forEach(row => {
					const rowKey = this.key(row);
					const found = items.indexOf(rowKey) > -1;
					if (found) {
						entries.push(row);
					}
				});
				break;
			}
			case 'column': {
				const columns = data.columns;
				columns.forEach(column => {
					const colKey = this.key(column);
					const found = items.indexOf(colKey) > -1;
					if (found) {
						entries.push(column);
					}
				});
				break;
			}
			case 'cell': {
				const cells = [];
				data.columns.forEach(column => {
					data.rows.forEach(row => {
						cells.push({
							column: column,
							row: row
						});
					});
				});
				cells.forEach(cell => {
					const cellKey = this.key(cell);
					const found = items.findIndex(item => stringifyCellKey(item) === cellKey) > -1;
					if (found) {
						entries.push(cell);
					}
				});
				break;
			}
			case 'mix': {
				const rowKeys = items
					.filter(key => key.unit === 'row')
					.map(key => key.item);
				const colKeys = items
					.filter(key => key.unit === 'column')
					.map(key => key.item);
				const cellKeys = items
					.filter(key => key.unit === 'cell')
					.map(key => key.item);

				this.lookup(rowKeys, 'row')
					.concat(this.lookup(colKeys, 'column'))
					.concat(this.lookup(cellKeys, 'cell'));
				break;
			}
			default:
				throw new AppError('selection.state', `Invalid unit ${unit}`);
		}

		return entries;
	}

	selectCore() {
	}

	clearCore() {
	}

	stateCore() {
		return false;
	}
}