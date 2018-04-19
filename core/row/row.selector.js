import {AppError} from '../infrastructure';
import {getFactory, get} from '../services/label';
import {isUndefined} from '../utility/utility';
import {Aggregation} from '../services';
import {getFactory as valueFactory} from '../services/value';

export class RowSelector {
	constructor(model) {
		this.model = model;
		this.source = this.model.clipboard().source;
		this.mode = this.model.selection().mode;
		this.view = this.model.view();
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
		const columns = this.model
			.view()
			.columns
			.filter(column => column.class === 'data' || column.class === 'pivot');

		const titles = this.titles(items);
		const ids = this.ids(items);

		const width = titles.length;
		const height = ids.length;

		const selectedColumns = columns.filter(column => titles.indexOf(column.title) >= 0);
		const head = selectedColumns.map(column => column.title);
		const foot = selectedColumns.map(column => this.value(column) === null ? '' : this.value(column));

		const emptyBody = this.createEmptyBody(height, width);
		const sortedIds = ids.sort();
		const body = this.fillBodyWithLabels(emptyBody, items, selectedColumns, sortedIds);

		return this.addHeadAndFootToBody(body, head, foot);
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
		const body = [];
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

			body.push(line);
		}

		return this.addHeadAndFootToBody(body, head, foot);
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

	fillBodyWithLabels(body, items, columns, ids) {
		for (let y = 0; y < ids.length; y++) {
			const cellsWithCurrentId = items.filter(cell => cell.row.id === ids[y]);

			for (let k = 0; k < cellsWithCurrentId.length; k++) {
				const cell = cellsWithCurrentId[k];
				const row = cell.row;
				const column = cell.column;
				const label = get(row, column);
				const specificTitles = this.getSpecificTitlesOfRow(row, columns);
				const x = specificTitles.indexOf(label);

				body[y][x] = label;
			}
		}

		return body;
	}

	titles(items) {
		const titles = [];
		items.forEach(item => titles.indexOf(item.column.title) >= 0 ? null : titles.push(item.column.title));

		return titles;
	}

	ids(items) {
		const ids = [];
		items.forEach(cell => ids.indexOf(cell.row.id) >= 0 ? null : ids.push(cell.row.id));

		return ids;
	}

	createEmptyBody(height, width) {
		const body = [];

		for (let h = 0; h < height; h++) {
			body[h] = [];

			for (let w = 0; w < width; w++) {
				body[h][w] = "";
			}

		}

		return body;
	}

	addHeadAndFootToBody(body, head, foot) {
		body.unshift(head);
		body.push(foot);

		return body;
	}

	getSpecificTitlesOfRow(row, columns) {
		let titles = [];

		for (let i = 0; i < columns.length; i++) {
			let label = get(row, columns[i]);
			titles.push(label);
		}

		return titles;
	}
}

