import {Layer} from './layer';
import {Row} from './row';
import {Column} from './column';
import {Cell} from './cell';
import {Element, ElementCore} from './element';
import {AppError} from '@grid/core/infrastructure';

class BoxCore extends ElementCore {
  constructor() {
    super();
  }

  column() {
    return Column.empty
  }

  row() {
    return Row.empty
  }

  rows() {
    return [];
  }

  rowCount() {
    return 0;
  }

  columnCount() {
    return 0;
  }

  cell() {
    return Cell.empty;
  }

  addLayer() {
    return Layer.empty;
  }

  removeLayer() {
  }

  scrollLeft() {
    return 0;
  }

  scrollTop() {
    return 0;
  }

}
const empty = new BoxCore();

export class Box extends Element {
  private layers: Map<string, Layer> = new Map();

  constructor(private document: Document,
              protected element: HTMLTableSectionElement,
              private name: string) {
    super(element);
  }

  static get empty() {
    return empty;
  }

  column(index) {
    if (index >= 0) {
      const rows = this.boxRows();
      if (rows.length) {
        const cellsCount = (rows[0]).cells.length;
        if (index < cellsCount) {
          return new Column(this.element, index)
        }
      }
    }
    return Column.empty;
  }

  row(index) {
    if (index >= 0) {
      const rows = this.boxRows();
      if (index < rows.length) {
        return new Row(rows[index]);
      }
    }
    return Row.empty;
  }

  rows() {
    return this.boxRows().map(element => new Row(element));
  }

  rowCount() {
    return this.boxRows().length;
  }

  columnCount() {
    if (this.rowCount() > 0) {
      const row = this.boxRows()[0];
      return row.cells.length;
    }

    return 0;
  }

  cell(row, column) {
    if (row >= 0 && column >= 0) {
      const rows = this.boxRows();
      if (rows.length) {
        const cellsCount = rows[0].cells.length;
        if (row < rows.length && column < cellsCount) {
          const cell = rows[row].cells.item(column);
          return new Cell(cell);
        }
      }
    }
    return Cell.empty;
  }

  addLayer(name) {
    // const layers = this.layers;
    // if (layers.has(name)) {
    //   return layers.get(name);
    // }
    //
    // const node = this.document.createElement(`div`);
    // node.classList.add(name);
    // this.element.appendChild(node);
    //
    // const ctrl = angular.element(this.element).controller(this.name);
    // if (!ctrl) {
    //   throw new AppError('box', 'Controller for box is not found')
    // }
    //
    // if (!ctrl.$scope) {
    //   throw new AppError('box', 'Controller scope for box is not found')
    // }
    //
    // const layer = new Layer(node);
    // layers.set(name, layer);
    // return layer;
  }

  removeLayer(name) {
    // const layers = this.layers;
    // if (layers.has(name)) {
    //   const layer = layers.get(name);
    //   layer.destroy();
    //   layer.element.parentElement.removeChild(layer.element);
    //   layers.delete(name);
    // }
  }

  scrollLeft(value) {
    if (!arguments.length) {
      return this.element.scrollLeft;
    }

    this.element.scrollLeft = value;
  }

  scrollTop(value) {
    if (!arguments.length) {
      return this.element.scrollTop;
    }

    this.element.scrollTop = value;
  }

  private boxRows(): Array<HTMLTableRowElement> {
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
