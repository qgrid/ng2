import {cloneDeep} from '../utility/kit';
import {CellEditor} from './edit.cell.editor';
import {get as getValue, set as setValue} from '../services/value';
import {get as getLabel, set as setLabel} from '../services/label';


class RowEditorCore {
	constructor() {
		this.editors = [];
	}

	commit() {
	}

	reset() {
	}
}


class TdView {
	constructor(row, column) {
		this.row = row;
		this.column = column;
	}

	get value() {
		return getValue(this.row, this.column);
	}

	set value(value) {
		return setValue(this.row, this.column, value);
	}

	get label() {
		return getLabel(this.row, this.column);
	}

	set label(value) {
		return setLabel(this.row, this.column, value);
	}
}

const empty = new RowEditorCore();
export class RowEditor extends RowEditorCore {
	constructor(row, columns) {
		super();

		this.value = cloneDeep(row);
		this.row = row;

		this.editors =
			columns
				.filter(column => column.canEdit)
				.map(column => new CellEditor(new TdView(this.value, column)));
	}

	commit() {
		this.editors.forEach(editor => editor.commit());
		Object.assign(this.row, this.value);
	}

	reset() {
		this.editors.forEach(editor => editor.reset());
		this.value = cloneDeep(this.row);
	}

	static get empty() {
		return empty;
	}
}