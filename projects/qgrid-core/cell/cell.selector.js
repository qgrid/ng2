import { GridError } from '../infrastructure/error';

export class CellSelector {
	constructor(model, table) {
		this.model = model;
		this.table = table;
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
				throw new GridError('cell.selector', `Invalid unit ${selectionState.unit}`);
		}
	}

	mapFromRows(items) {
		const { table } = this;
		const result = [];
		const rows = table.data.rows();

		for (let item of items) {
			const index = rows.indexOf(item);
			for (let cell of table.body.row(index).cells()) {
				result.push(cell);
			}
		}

		return result;
	}

	mapFromColumns(items) {
		const { table } = this;
		const result = [];
		const columns = table.data.columns();

		for (let item of items) {
			const index = columns.findIndex(c => c === item);
			result.push(...table.body.column(index).cells());
		}

		return result;
	}

	mapFromCells(items) {
		const { table } = this;
		const result = [];
		const rows = table.data.rows();
		const columns = table.data.columns();

		for (let item of items) {
			const rowIndex = rows.indexOf(item.row);
			const columnIndex = columns.findIndex((c) => c === item.column);
			result.push(table.body.cell(rowIndex, columnIndex));
		}

		return result;
	}

	mapFromMix(items) {
		const entries = Array.from(items);
		const rows = entries.filter(item => item.unit === 'row').map(item => item.item);
		const cells = entries.filter(item => item.unit === 'cell').map(item => item.item);

		return [
			...this.mapFromRows(rows),
			...this.mapFromCells(cells)
		];
	}
}