import { GridError } from '../infrastructure/error';

export class SelectionRange {
	constructor(model) {
		this.model = model;
	}

	build() {
		const rangeMap = {
			'row': this.buildRows.bind(this),
			'column': this.buildColumns.bind(this),
			'cell': this.buildCells.bind(this),
			'mix': this.buildMix.bind(this)
		};

		const model = this.model;
		return (...args) => {
			const selection = model.selection();
			const buildRange = rangeMap[selection.unit];
			if (!buildRange) {
				throw new GridError('range.builder', `Invalid unit ${selection.unit}`);
			}

			return buildRange(...args);
		};
	}

	buildRows(startCell, endCell) {
		const model = this.model;
		const { rows } = model.scene();
		if (!endCell) {
			return [rows[startCell.rowIndex]];
		}

		const startIndex = Math.min(startCell.rowIndex, endCell.rowIndex);
		const endIndex = Math.max(startCell.rowIndex, endCell.rowIndex);
		return rows.slice(startIndex, endIndex + 1);
	}

	buildColumns(startCell, endCell) {
		if (!endCell) {
			return [startCell.column];
		}

		const columns = this.model.columnList().line;
		const startIndex = Math.min(startCell.columnIndex, endCell.columnIndex);
		const endIndex = Math.max(startCell.columnIndex, endCell.columnIndex);
		return columns.slice(startIndex, endIndex + 1);
	}

	buildCells(startCell, endCell) {
		if (!endCell) {
			return [{
				column: startCell.column,
				row: startCell.row
			}];
		}

		const model = this.model;
		const { rows } = model.scene();
		const { columns } = model.view();

		const startRowIndex = Math.min(startCell.rowIndex, endCell.rowIndex);
		const endRowIndex = Math.max(startCell.rowIndex, endCell.rowIndex);

		const startColumnIndex = Math.min(startCell.columnIndex, endCell.columnIndex);
		const endColumnIndex = Math.max(startCell.columnIndex, endCell.columnIndex);

		const selectedRows = rows.slice(startRowIndex, endRowIndex + 1);
		const selectedColumns = columns.slice(startColumnIndex, endColumnIndex + 1);

		const items = [];
		selectedRows.forEach(row => {
			selectedColumns
				.filter(column => column.category === 'data')
				.forEach(column => {
					items.push({
						column: column,
						row: row
					});
				});
		});

		return items;
	}

	buildMix(startCell, endCell) {
		const mixUnit = startCell.column.type === 'row-indicator' ? 'row' : 'cell';
		const range = (mixUnit === 'row' ? this.buildRows(startCell, endCell) : this.buildCells(startCell, endCell));
		return range
			.map(item => ({
				item: item,
				unit: mixUnit
			}));
	}
}