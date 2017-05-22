import {Fetch} from '../infrastructure';
import {parseFactory} from '../services';
import {clone, isUndefined, noop} from '../services/utility';

class CellEditorCore {
	constructor() {
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

const empty = new CellEditorCore();

export class CellEditor extends CellEditorCore {
	constructor(cell) {
		super();

		this.cell = cell;
		this.fetch = this.fetchFactory();
		this.resetFetch = this.fetch.run(cell.row);

		const parse = parseFactory(cell.column.type);
		this.value = isUndefined(cell.value) ? null : parse(clone(cell.value));
		this.label = isUndefined(cell.label) ? null : clone(cell.label);
	}

	commit() {
		this.cell.value = this.value;
		this.cell.label = this.label;
		this.resetFetch();
		this.resetFetch = noop;
	}

	reset() {
		this.value = this.cell.value;
		this.resetFetch();
		this.resetFetch = noop;
	}

	get title() {
		return this.cell.column.title;
	}

	get options() {
		return this.cell.column.editorOptions;
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