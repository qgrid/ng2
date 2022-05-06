import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { ColumnModel } from './column.model';

TemplatePath.register('row-expand-cell', (template, column) => ({
  model: template.for,
  resource: column.key,
}));

export class RowExpandColumnModel extends ColumnModel {
  constructor() {
    super('row-expand');

    this.key = '$row.expand';
    this.category = 'control';

    this.canEdit = false;
    this.canResize = false;
    this.canFilter = false;
    this.canSort = false;
    this.canHighlight = false;
    this.canMove = false;
  }
}

export class RowExpandColumn extends ColumnView {
  constructor(model) {
    super(model);
  }

  static model(model) {
    return model ? RowExpandColumn.assign(model) : new RowExpandColumnModel();
  }
}
