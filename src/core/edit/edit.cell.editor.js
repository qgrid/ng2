import Fetch from 'core/infrastructure/fetch';
import {parseFactory} from 'core/services/convert';
import {clone, isUndefined, noop} from 'core/services/utility';

class CellEditorCore {
	constructor() {

		this.value = null;
		this.label = null;
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

export default class CellEditor extends CellEditorCore {
	constructor(cell) {
		super();

		this.cell = cell;
		this.fetch = this.fetchFactory();
		this.resetFetch = this.fetch.run(cell.row);

		const parse = parseFactory(cell.column.type);
		this.value = isUndefined(cell.value) ? null : parse(clone(cell.value));
		this.label = isUndefined(cell.label) ? null : parse(clone(cell.label));
	}

	commit() {
		this.cell.value = this.value;
		this.cell.label = this.label;
		this.resetFetch();
		this.resetFetch = noop;
	}

	reset() {
		this.value = this.cell.value;
		this.label = this.cell.label;
		this.resetFetch();
		this.resetFetch = noop;
	}

	get options() {
		return this.cell.column.editorOptions;
	}

	fetchFactory() {
		const options = this.options;
		if (options && options.fetch) {
			return new Fetch(options.fetch);
		}
		return new Fetch(() => this.cell.value);
	}

	static get empty() {
		return empty;
	}
}