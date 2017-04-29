import {GRID_PREFIX} from 'core/definition';

export default class HighlightBehavior {
	constructor(model, cellSelector) {
		this.model = model;
		this.cellSelector = cellSelector;

		this.cells = new Set();
	}

	state(cell, state) {
		if (state) {
			cell.addClass(`${GRID_PREFIX}-selected`);
		}
		else {
			cell.removeClass(`${GRID_PREFIX}-selected`);
		}
	}

	update(items) {
		this.clear();

		this.cells = new Set(this.cellSelector(items));
		this.cells.forEach(cell => this.state(cell, true));
	}

	clear() {
		this.cells.forEach(cell => this.state(cell, false));
	}
}