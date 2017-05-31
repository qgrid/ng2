import {AppError} from '../infrastructure';

export class Cell {
	constructor(cell) {
		this.entry = cell;

		// We need to cache it due to possible virtual mode;
		this.rowIndex = cell.rowIndex;
		this.columnIndex = cell.columnIndex;
		this.column = cell.column;
		this.row = cell.row;
	}

	get value() {
		if (!Cell.equals(this, this.entry)) {
			throw new AppError('cell', 'Internal model doesn\'t match container');
		}

		return this.entry.value;
	}

	set value(value) {
		if (!Cell.equals(this, this.entry)) {
			throw new AppError('cell', 'Internal model doesn\'t match container');
		}

		this.entry.value = value;
	}

	get label() {
		if (!Cell.equals(this, this.entry)) {
			throw new AppError('cell', 'Internal model doesn\'t match container');
		}

		return this.entry.label;
	}

	set label(label) {
		if (!Cell.equals(this, this.entry)) {
			throw new AppError('cell', 'Internal model doesn\'t match container');
		}

		this.entry.label = label;
	}

	mode(value) {
		if (!this.entry.mode) {
			throw new AppError('cell', 'Internal model doesn\'t support mode');
		}

		this.entry.mode(value);
	}

	static equals(x, y) {
		if (x === y) {
			return true;
		}

		if (!x || !y) {
			return false;
		}

		return x.rowIndex === y.rowIndex
			&& x.columnIndex === y.columnIndex;
	}
}