import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { ColumnModel } from './column.model';

TemplatePath.register('row-number-cell', (template, column) => ({
  model: template.for,
  resource: column.key,
}));

export class RowNumberColumnModel extends ColumnModel {
  constructor() {
    super('row-number');

    this.pin = 'left';
    this.key = '$row.number';
    this.title = 'No.';
    this.canEdit = false;
    this.canResize = true;
    this.canFocus = false;
    this.canMove = false;
    this.canHighlight = false;
    this.canSort = false;
    this.canFilter = false;
    this.category = 'control';
  }
}

export class RowNumberColumn extends ColumnView {
  constructor(model) {
    super(model);
  }

  static model(model) {
    return model ? RowNumberColumn.assign(model) : new RowNumberColumnModel();
  }
}
