import { TrContainer } from './container';

export class Bag {
	constructor() {
		this.rows = new Set();
		this.cells = new Set();
		this.elements = new Map();
		this.rowContainer = new Map();
	}

	findModel(element) {
		return this.elements.get(element);
	}

	hasModel(element) {
		return this.elements.has(element);
	}

	getRowElements() {
		return this.rowContainer.values();
	}

	getCellElements() {
		return this.cells;
	}

	addRow(tr) {
		const { rowContainer } = this;
		const { model, element } = tr;

		this.rows.add(tr);
		this.elements.set(element, tr);

		const container = rowContainer.get(model);
		if (container) {
			container.elements.push(tr);
		} else {
			rowContainer.set(model, new TrContainer([tr]));
		}
	}

	addCell(td) {
		this.cells.add(td);
		this.elements.set(td.element, td);
	}

	deleteRow(tr) {
		const { rowContainer } = this;
		const { model, element } = tr;

		this.rows.delete(tr);
		this.elements.delete(element);

		const container = rowContainer.get(model);
		if (container) {
			const { elements } = container;
			const index = elements.indexOf(element);
			if (index >= 0) {
				elements.splice(index, 1);
				if (!element.length) {
					rowContainer.delete(model);
				}
			}
		}
	}

	deleteCell(td) {
		this.cells.delete(td);
		this.elements.delete(td.element);
	}
}