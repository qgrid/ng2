import { FakeElement } from '../fake/element';
import { Container } from '../container';
import { zip, sumBy, max, isUndefined } from '../../utility/kit';

export class SelectorMediator {
	constructor(selectorFactory, factory) {
		this.buildSelectors = selectorFactory;
		this.factory = factory;
	}

	columnCount(rowIndex) {
		const selectors = this.buildSelectors({ row: rowIndex });
		if (!selectors.length) {
			return 0;
		}

		return sumBy(selectors, s => s.invoke((s, rowIndex) => s.columnCount(rowIndex)));
	}

	columnCells(columnIndex) {
		const selectors = this.buildSelectors({ column: columnIndex });
		const result = [];
		for (let i = 0, length = selectors.length; i < length; i++) {
			const selector = selectors[i];
			const cells = selector.invoke((s, columnIndex) => s.columnCells(columnIndex));
			result.push(...cells);
		}

		return result;
	}

	rowCount(columnIndex) {
		const selectors = this.buildSelectors({ column: columnIndex });
		if (!selectors.length) {
			return 0;
		}

		return max(selectors.map(s => s.invoke((s, columnIndex) => s.rowCount(columnIndex))));
	}

	rows(columnIndex) {
		const context = isUndefined(columnIndex) ? {} : { column: columnIndex };
		const selectors = this.buildSelectors(context);
		const factory = this.factory;
		const areas = [];
		for (let i = 0, length = selectors.length; i < length; i++) {
			const selector = selectors[i];
			const rows = selector.invoke((s, columnIndex) => s.rows(columnIndex));
			if (rows.length) {
				areas.push(rows);
			}
		}

		const lines = zip(...areas);
		const result = [];
		for (let i = 0, length = lines.length; i < length; i++) {
			const line = lines[i];
			const elements = line.map(row => row.element);
			const rowElement = elements.length > 1 ? new Container(elements) : elements[0];
			const rowIndex = line[0].index;
			const row = factory.row(rowElement, rowIndex);
			result.push(row);
		}

		return result;
	}

	rowCells(rowIndex) {
		const selectors = this.buildSelectors({ row: rowIndex });
		const result = [];
		for (let i = 0, length = selectors.length; i < length; i++) {
			const selector = selectors[i];
			const cells = selector.invoke((s, rowIndex) => s.rowCells(rowIndex));
			result.push(...cells);
		}

		return result;
	}

	row(rowIndex) {
		const selectors = this.buildSelectors({ row: rowIndex });
		const result = [];
		for (let i = 0, length = selectors.length; i < length; i++) {
			const selector = selectors[i];
			const row = selector.invoke((s, rowIndex) => s.row(rowIndex));
			result.push(row.element);
		}

		return this.factory.row(new Container(result), rowIndex);
	}

	cell(rowIndex, columnIndex) {
		const selectors = this.buildSelectors({ row: rowIndex, column: columnIndex });
		for (let i = 0, length = selectors.length; i < length; i++) {
			const selector = selectors[i];
			const cell = selector.invoke((s, rowIndex, columnIndex) => s.cell(rowIndex, columnIndex));
			if (!(cell.element instanceof FakeElement)) {
				return cell;
			}
		}

		return this.factory.cell(new FakeElement(), rowIndex, columnIndex);
	}
}