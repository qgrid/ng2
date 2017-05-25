import {AppError} from '../infrastructure';

export function cellSelector(model, table) {
	function getRows(items) {
		const result = [];
		const rows = model.view().rows;

		for (let item of items) {
			const index = rows.indexOf(item);
			for (let cell of table.body.row(index).cells()) {
				result.push(cell);
			}
		}

		return result;
	}

	function getColumns(items) {
		const result = [];
		const columns = table.data.columns();

		for (let item of items) {
			const index = columns.findIndex(c => c === item);
			for (let row of table.body.rows()) {
				result.push(row.cell(index));
			}
		}

		return result;
	}

	function getCells(items) {
		const result = [];
		const rows = model.view().rows;
		const columns = table.data.columns();

		for (let item of items) {
			const rowIndex = rows.indexOf(item.row);
			const columnIndex = columns.findIndex((c) => c === item.column);
			result.push(table.body.cell(rowIndex, columnIndex));
		}

		return result;
	}

	function getMix(items) {
		const itemsArray = Array.from(items);

		const rows = itemsArray.filter(item => item.unit === 'row').map(item => item.item);
		const cells = itemsArray.filter(item => item.unit === 'row').map(item => item.item);

		return [
			...getRows(rows),
			...getCells(cells)
		];
	}

	const selectorMap = {
		'row': getRows,
		'column': getColumns,
		'cell': getCells,
		'mix': getMix,
	};

	return (...args) => {
		const selection = model.selection();
		const cellSelector = selectorMap[selection.unit];
		if (!cellSelector) {
			throw new AppError('cell.selector', `Invalid unit ${selection.unit}`);
		}

		return cellSelector(...args);
	};
}