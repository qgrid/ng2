import {AppError} from '../infrastructure';
import {getFactory, get} from '../services/label';
import {isUndefined} from '../utility/utility';

export class RowSelector {
	constructor(model) {
		this.model = model;
	}

	map(items) {
		const selectionState = this.model.selection();

		switch (selectionState.unit) {
			case 'row':
				return this.mapFromRows(items);
			case 'column':
				return this.mapFromColumns(items);
			case 'cell':
				return this.mapFromCells(items);
			case 'mix':
				return this.mapFromMix(items);
			default:
				throw new AppError('row.selector', `Invalid unit ${selectionState.unit}`);
		}
	}

	mapFromRows(rows) {
		let value;
		const result = [];
		const cache = new Map();
		const columns = this.model
			.view()
			.columns
			.filter(column => column.class === 'data');

		for (const row of rows) {
			const line = [];

			for (const column of columns) {
				let label;
				if(cache.has(column)) {
					label = cache.get(column)
				} else {
					label = getFactory(column);
					cache.set(column, label);
				}

				value = label(row);
				line.push(value === null || isUndefined(value) ? '' : '' + value);
			}

			result.push(line);
		}

		return result;
	}

	mapFromColumns(columns) {
		const result = [];
		const rows = this.model.view().rows;

		for(let i = 0, max = columns.length; i < max; i++) {
			const column = columns[i];
			const label = getFactory(column);
			const cells = rows.map(row => label(row));

			if (!result.length) {
				for(let j = 0, max = cells.length; j < max; j++) {
					result.push([]);
				}
			}

			for(let k = 0, max = cells.length; k < max; k++) {
				result[k][i] = cells[k]
			}
		}

		return result;
	}

	mapFromCells(items) {
		const result = [];
		let line = [];
		const namesOfColumns = new Set();

		items.forEach(item => {
			const row = item.row;
			const column = item.column;
			let label = get(row, column);
			label = label === null || isUndefined(label) ? '' : '' + label;
			const nameOfColumn = column.key;

			if (!namesOfColumns.has(nameOfColumn)) {
				line.push(label);
				namesOfColumns.add(nameOfColumn);
			} else {
				result.push(line);
				line = [];
				namesOfColumns.clear();
				line.push(label);
				namesOfColumns.add(nameOfColumn);
			}
		});

		result.push(line);

		return result;
	}

	mapFromMix(items) {
		for (const item of items) {

			switch (item.unit) {
				case 'row': {
					const row = item.item;
					return this.mapFromRows([row]);
				}
				case 'cell': {
					const cells = [];
					items.forEach(item => {
						const row = item.item.row;
						const column = item.item.column;

						cells.push({row, column})
					});

					return this.mapFromCells(cells);
				}
			}

		}

	}
}
