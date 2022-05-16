import * as columnService from '../column/column.service';

export class Data {
  constructor(model) {
    this.model = model;
  }

  columns() {
    return this.model.view().columns;
  }

  columnMap() {
    return columnService.mapColumns(this.columns());
  }

  rows() {
    return this.model.scene().rows;
  }
}
