import { Fetch } from '../infrastructure/fetch';
import { parseFactory } from '../services/convert';
import { clone, isUndefined, noop } from '../utility/kit';

class CellEditorCore {
	constructor(td) {
		this.td = td;

		this.value = null;
		this.label = null;

		this.fetch = noop;
		this.resetFetch = noop;
	}

	commit() {
	}

	reset() {
	}

	clear() {

	}
}

const empty = new CellEditorCore(null);

export class CellEditor extends CellEditorCore {
	constructor(td) {
		super(td);

		this.fetch = this.fetchFactory();
		this.resetFetch = this.fetch.run(td.row);

		if (isUndefined(td.value)) {
			this.value = null;
		}
		else {
			const parse = parseFactory(td.column.type, td.column.editor);
			const typedValue = parse(clone(td.value));
			this.value = typedValue === null ? td.value : typedValue;
		}

		this.label = isUndefined(td.label) ? null : clone(td.label);
	}

	commit() {
		this.td.value = this.value;
		this.td.label = this.label;

		this.resetFetch();
		this.resetFetch = noop;
	}

	reset() {
		this.label = this.td.label;
		this.value = this.td.value;

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
		const { editorOptions } = this.td.column;
		if (editorOptions && editorOptions.fetch) {
			return new Fetch(editorOptions.fetch);
		}

		return new Fetch(this.td.value);
	}

	static get empty() {
		return empty;
	}
}