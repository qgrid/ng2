import {Cell} from './cell';
import {Element, ElementCore} from './element';

class ColumnCore extends ElementCore {
  constructor() {
    super();
  }

  cells() {
    return [];
  }

  cell() {
    return Cell.empty;
  }

  cellCount() {
    return 0;
  }
}

const empty = new ColumnCore();
export class Column extends Element {
  constructor(protected element: HTMLTableSectionElement, private index) {
    super(element);
  }

  static get empty() {
    return empty;
  }

  cells() {
    const index = this.index;
    const rows = this.rows();
    const result = [];
    for (let i = 0, length = rows.length; i < length; i++) {
      const cell = rows[i].cells.item(index);
      result.push(new Cell(cell));
    }
    return result;
  }

  cell(row: number) {
    if (row >= 0 && row < this.cellCount()) {
      const rows = this.rows();
      const cell = rows[row][this.index];
      return new Cell(cell);
    }
    return Cell.empty;
  }

  cellCount() {
    return this.rows().length;
  }

  private rows(): Array<HTMLTableRowElement> {
    const rows = this.element.rows;
    const result = [];
    for (let i = 0, length = rows.length; i < length; i++) {
      const row = rows.item(i);
      if (!row.classList.contains('vscroll-mark')) {
        result.push(row);
      }
    }

    return result;
  }
}
