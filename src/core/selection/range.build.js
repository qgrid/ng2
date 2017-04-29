import * as columnService from 'core/column/column.service';
import AppError from 'core/infrastructure/error';

export default function rangeBuilder(model) {
	function rangeRows(startCell, endCell) {
		const rows = model.view().rows;
		if (!endCell) {
			return [rows[startCell.rowIndex]];
		}

		const startIndex = Math.min(startCell.rowIndex, endCell.rowIndex);
		const endIndex = Math.max(startCell.rowIndex, endCell.rowIndex);
		return rows.slice(startIndex, endIndex + 1);
	}

	function rangeColumns(startCell, endCell) {
		const columns = columnService.lineView(model.view().columns);
		if (!endCell) {
			return [columns.find(c => c.model === startCell.column).model];
		}

		const startIndex = Math.min(startCell.columnIndex, endCell.columnIndex);
		const endIndex = Math.max(startCell.columnIndex, endCell.columnIndex);
		return columns.slice(startIndex, endIndex + 1).map(column => column.model);
	}

	function rangeCells(startCell, endCell) {
		if (!endCell) {
			return [{
				column: startCell.column,
				row: startCell.row
			}];
		}

		const rows = model.view().rows;
		const columns = columnService.lineView(model.view().columns);

		const startRowIndex = Math.min(startCell.rowIndex, endCell.rowIndex);
		const endRowIndex = Math.max(startCell.rowIndex, endCell.rowIndex);

		const startColumnIndex = Math.min(startCell.columnIndex, endCell.columnIndex);
		const endColumnIndex = Math.max(startCell.columnIndex, endCell.columnIndex);

		const rowsSelected = rows.slice(startRowIndex, endRowIndex + 1);
		const columnsSelected = columns.slice(startColumnIndex, endColumnIndex + 1);

		const items = [];
		rowsSelected.forEach(row => {
			columnsSelected
				.filter(column => column.model.type !== 'row-indicator')
				.forEach(column => {
					items.push({
						column: column.model,
						row: row
					});
				});
		});

		return items;
	}

	function rangeMix(startCell, endCell) {
		const mixUnit = startCell.column.type === 'row-indicator' ? 'row' : 'cell';
		const range = (mixUnit === 'row' ? rangeRows(startCell, endCell) : rangeCells(startCell, endCell));
		return range
			.map(item => ({
				item: item,
				unit: mixUnit
			}));
	}

	const rangeMap = {
		'row': rangeRows,
		'column': rangeColumns,
		'cell': rangeCells,
		'mix': rangeMix,
	};

	return (...args) => {
		const selection = model.selection();
		const getRange = rangeMap[selection.unit];
		if (!getRange) {
			throw new AppError('range.builder', `Invalid unit ${selection.unit}`);
		}

		return getRange(...args);
	};
}