import { getLabel, setLabel } from '../services/label';
import { getValue, setValue } from '../services/value';
import { cloneDeep } from '../utility/kit';
import { CellEditor } from './edit.cell.editor';


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

  get value() {
    return getValue(this.row, this.column);
  }

  set value(value) {
    setValue(this.row, this.column, value);
  }

  get label() {
    return getLabel(this.row, this.column);
  }

  set label(value) {
    setLabel(this.row, this.column, value);
  }

  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

const empty = new RowEditorCore();
export class RowEditor extends RowEditorCore {

  static get empty() {
    return empty;
  }

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
}
