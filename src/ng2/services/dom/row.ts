import {Cell} from './cell';
import {Element, ElementCore} from './element';

class RowCore extends ElementCore {
	constructor() {
		super();
	}
	cells() {
		return [];
	}

	cell() {
		return Cell.empty;
	}

	cellCount() {
		return 0;
	}
}

const empty = new RowCore();
export class Row extends Element {
	constructor(protected element: HTMLTableRowElement) {
		super(element);
	}

	static get empty() {
		return empty;
	}

	cells() {
		const cells = this.element.cells;
		const result = [];
		for (let i = 0, length = cells.length; i < length; i++) {
			const cell = cells.item(i);
			result.push(new Cell(cell));
		}
		return result;
	}

	cell(column: number) {
		if (column >= 0 && column < this.cellCount()) {
			const cells = this.element.cells;
			const cell = cells.item(column);
			return new Cell(cell);
		}
		return Cell.empty;
	}

	cellCount() {
		return this.element.cells.length;
	}
}
