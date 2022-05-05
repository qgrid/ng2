import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { DataColumnModel } from './data.column.model';

TemplatePath.register('text-cell', (template, column) => ({
  model: template.for,
  resource: column.key,
}));

TemplatePath.register('text-cell-edit', (template, column) => ({
  model: 'edit',
  resource: column.key,
}));

TemplatePath.register('text-area-cell-edit', (template, column) => ({
  model: 'edit',
  resource: column.key,
}));

export class TextColumnModel extends DataColumnModel {
  constructor() {
    super('text');

    this.maxLength = 140;
  }
}

export class TextColumn extends ColumnView {
  constructor(model) {
    super(model);
  }

  static model(model) {
    return model ? TextColumn.assign(model) : new TextColumnModel();
  }
}
