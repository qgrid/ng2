import {AppError} from '../infrastructure';
import {getFactory, get} from '../services/label';

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
		const result = [];
		const columns = this.model.view().columns;
		const cache = new Map(columns.map(column => [column.key]));

		for(const row of rows) {
			const line = [];

			for (const column of columns) {
				if(cache.has(column.key)) {
					const label = getFactory(column);
					const value = label(row);

					if(value && typeof value === 'string') {
						line.push(value);
					}
				}

			}

			result.push(line);
		}

		return result;
	}

	mapFromColumns(columns) {
		const result = [];
		const rows = this.model.view().rows;

		columns.forEach((column, columnIndex) => {
			const label = getFactory(column);
			const cells = rows.map(row => label(row));

			if (!result.length) {
				cells.forEach(cell => result.push([]));
			}

			cells.forEach((cell, cellIndex) => {
				result[cellIndex][columnIndex] = cells[cellIndex];
			})

		});

		return result;
	}

	mapFromCells(items) {
		const result = [];
		let line = [];

		let keysForComparison = [];

		items.forEach(item => {
			const row = item.row;
			const column = item.column;
			const label = get(row, column);
			const columnKey = column.key;

			if (!keysForComparison.includes(columnKey)) {
				line.push(label);
				keysForComparison.push(columnKey);
			} else {
				result.push(line);
				line = [];
				keysForComparison = [];
				line.push(label);
				keysForComparison.push(columnKey);
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

						cells.push({row: row, column: column})
					});

					return this.mapFromCells(cells);
				}
			}

		}

	}
}
