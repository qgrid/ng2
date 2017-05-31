import {AppError} from '../infrastructure';

export class Row {
	constructor(row) {
		this.entry = row;

		// We need to cache it due to possible virtual mode;
		this.index = row.index;
	}

	get model() {
		if (!Row.equals(this, this.entry)) {
			throw new AppError('row', 'Internal model doesn\'t match container');
		}

		return this.entry.model;
	}

	static equals(x, y) {
		if (x === y) {
			return true;
		}

		if (!x || !y) {
			return false;
		}

		return x.index === y.index;
	}
}