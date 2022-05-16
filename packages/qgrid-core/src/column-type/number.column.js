import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { DataColumnModel } from './data.column.model';

TemplatePath.register('number-cell', (template, column) => ({
  model: template.for,
  resource: column.key,
}));

TemplatePath.register('number-cell-edit', (template, column) => ({
  model: 'edit',
  resource: column.key,
}));

export class NumberColumnModel extends DataColumnModel {
  constructor() {
    super('number');

    this.format = '';
  }
}

export class NumberColumn extends ColumnView {
  constructor(model) {
    super(model);
  }

  static model(model) {
    return model ? NumberColumn.assign(model) : new NumberColumnModel();
  }
}
