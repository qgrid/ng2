import { GridError } from '../../infrastructure/error';
import { Cell } from '../cell';
import { FakeElement } from '../fake/element';
import { Td } from '../td';

class VirtualTd {

  get model() {
    const td = this.selector();
    if (!td) {
      throw new GridError('cell', 'Model is not found');
    }

    return td;
  }

  get value() {
    return this.model.value;
  }

  set value(value) {
    this.model.value = value;
  }

  get label() {
    return this.model.label;
  }

  set label(value) {
    this.model.label = value;
  }

  get element() {
    return this.model.element || new FakeElement();
  }

  constructor(selector) {
    this.selector = selector;
  }

  mode(value) {
    return this.model.mode(value);
  }
}

export class VirtualCell extends Cell {
  constructor(box, rowIndex, columnIndex, element = null) {
    super(box.context, rowIndex, columnIndex, element);

    this.box = box;

    const { mapper } = box.context;
    this.dataRowIndex = mapper.viewToRow(rowIndex);
    this.dataColumnIndex = mapper.viewToColumn(columnIndex);
  }

  model() {
    const rowIndex = this.dataRowIndex;
    const columnIndex = this.dataColumnIndex;

    if (rowIndex >= 0 && columnIndex >= 0) {
      const gridModel = this.box.model;
      const { rows } = gridModel.data();
      const { columns } = gridModel.view();

      if (rows.length > rowIndex && columns.length > columnIndex) {
        const selector = () => this.box.cell(rowIndex, columnIndex).modelCore();
        const vtd = new VirtualTd(selector);
        vtd.rowIndex = rowIndex;
        vtd.columnIndex = columnIndex;
        vtd.row = rows[rowIndex];
        vtd.column = columns[columnIndex];

        return new Td(vtd);
      }
    }

    return null;
  }

  addClass(name, force = false) {
    this.box.addCellClass(this, name, force);
  }

  removeClass(name, force = false) {
    this.box.removeCellClass(this, name, force);
  }
}
