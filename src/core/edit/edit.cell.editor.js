import { Fetch } from '../infrastructure/fetch';
import { parseFactory } from '../services/convert';
import { clone, isUndefined, noop } from '../utility/kit';

class CellEditorCore {
	constructor(cell) {
		this.cell = cell;

		this.value = null;
		this.fetch = noop;
		this.resetFetch = noop;
	}

	commit() {
	}

	reset() {
	}

	get options() {
		return {};
	}
}

const empty = new CellEditorCore(null);

export class CellEditor extends CellEditorCore {
	constructor(cell) {
		super(cell);

		this.fetch = this.fetchFactory();
		this.resetFetch = this.fetch.run(cell.row);

		if (isUndefined(cell.value)) {
			this.value = null;
		}
		else {
			const parse = parseFactory(cell.column.type, cell.column.editor);
			const typedValue = parse(clone(cell.value));
			this.value = typedValue === null ? cell.value : typedValue;
		}

		this.label = isUndefined(cell.label) ? null : clone(cell.label);
	}

	commit() {
		this.cell.value = this.value;
		this.cell.label = this.label;
		this.resetFetch();
		this.resetFetch = noop;
	}

	reset() {
		this.label = this.cell.label;
		this.value = this.cell.value;
		this.resetFetch();
		this.resetFetch = noop;
	}

	clear() {
		this.label = null;
		this.value = null;
		this.resetFetch();
		this.resetFetch = noop;
	}

	fetchFactory() {
		const options = this.options;
		if (options && options.fetch) {
			return new Fetch(options.fetch);
		}
		return new Fetch(this.cell.value);
	}

	static get empty() {
		return empty;
	}
}