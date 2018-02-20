import {AppError} from '../infrastructure';
import {getFactory, get} from '../services/label';
import {isUndefined} from '../utility/utility';
import {Aggregation} from '../services';
import {getFactory as valueFactory} from '../services/value';

export class RowSelector {
	constructor(model) {
		this.model = model;
		this.source = this.model.clipboard().source;
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
		const columns = this.model
			.view()
			.columns
			.filter(column => column.class === 'data' || column.class === 'pivot');

		return this.mapFromRowColumns(rows, columns);
	}


	mapFromColumns(columns) {
		const rows = this.model.view().rows;

		return this.mapFromRowColumns(rows, columns);
	}

	mapFromCells(items) {
		const result = [];
		let line = [];
		const namesOfColumns = new Set();
		const titles = items.map(item => item.column.title);
		const aggregations = items.map(item => this.value(item.column) === null ? '' : this.value(item.column));

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

		const head = titles.slice(0, line.length);
		const foot = aggregations.slice(0, line.length);

		result.unshift(head);
		result.push(line);
		result.push(foot);

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

	mapFromRowColumns(rows, columns) {
		const result = [];
		const cache = new Map();

		const head = columns.map(column => column.title);
		const foot = columns.map(column => this.value(column) === null ? '' : this.value(column));

		for (const row of rows) {
			const line = [];

			for (const column of columns) {
				let label;
				const key = column.key;

				if (cache.has(key)) {
					label = cache.get(key)
				} else {
					label = getFactory(column);
					cache.set(key, label);
				}

				const value = label(row);
				line.push(value === null || isUndefined(value) ? '' : '' + value);
			}

			result.push(line);
		}

		result.unshift(head);
		result.push(foot);

		return result;
	}

	value(column) {
		if (column.aggregation) {
			const aggregation = column.aggregation;
			const aggregationOptions = column.aggregationOptions;

			if (!Aggregation.hasOwnProperty(aggregation)) {
				throw new AppError(
					'row.selector',
					`Aggregation ${aggregation} is not registered`);
			}

			const rows = this.model.data().rows;
			const getValue = valueFactory(column);

			return Aggregation[aggregation](rows, getValue, aggregationOptions);
		}
		return null;
	}
}
