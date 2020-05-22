import { GridError } from '../infrastructure/error';

export class Td {
	constructor(td) {
		this.td = td;

		// We need to cache it due to possible virtual mode;
		this.rowIndex = td.rowIndex;
		this.columnIndex = td.columnIndex;
	}

	get row() {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		return this.td.row;
	}

	get column() {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		return this.td.column;
	}

	get value() {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		return this.td.value;
	}

	set value(value) {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		this.td.value = value;
	}

	get label() {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		return this.td.label;
	}

	get element() {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		return this.td.element;
	}

	set label(label) {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		this.td.label = label;
	}

	mode(value) {
		if (!Td.equals(this, this.td)) {
			throw new GridError('td', 'Internal model doesn\'t match container');
		}

		this.td.mode(value);
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