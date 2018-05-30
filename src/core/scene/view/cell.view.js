import { AppError } from '../../infrastructure/error';

export class CellView {
	constructor(model) {
		this.model = model;

		// We need to cache it due to possible virtual mode;
		this.rowIndex = model.rowIndex;
		this.columnIndex = model.columnIndex;
		this.column = model.column;
		this.row = model.row;
	}

	get value() {
		if (!CellView.equals(this, this.model)) {
			throw new AppError('cell', 'Internal model doesn\'t match container');
		}

		return this.model.value;
	}

	set value(value) {
		if (!CellView.equals(this, this.model)) {
			throw new AppError('cell', 'Internal model doesn\'t match container');
		}

		this.model.value = value;
	}

	get label() {
		if (!CellView.equals(this, this.model)) {
			throw new AppError('cell', 'Internal model doesn\'t match container');
		}

		return this.model.label;
	}

	set label(label) {
		if (!CellView.equals(this, this.model)) {
			throw new AppError('cell', 'Internal model doesn\'t match container');
		}

		this.model.label = label;
	}

	mode(value) {
		if (!this.model.mode) {
			throw new AppError('cell', 'Internal model doesn\'t support mode');
		}

		this.model.mode(value);
	}

	static equals(x, y) {
		if (x === y) {
			return true;
		}

		if (!x || !y) {
			return false;
		}

		return x.rowIndex === y.rowIndex && x.columnIndex === y.columnIndex;
	}
}