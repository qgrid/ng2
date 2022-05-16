import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { noop } from '../utility/kit';
import { ColumnModel } from './column.model';

TemplatePath.register('select-cell', (template, column) => ({
  model: template.for,
  resource: column.key,
}));

TemplatePath.register('select-cell-edit', (template, column) => ({
  model: 'edit',
  resource: column.key,
}));

export class SelectColumnModel extends ColumnModel {
  constructor() {
    super('select');

    this.key = '$select';
    this.title = '';
    this.category = 'control';

    this.canEdit = false;
    this.editorOptions.cruise = 'transparent';
    this.value = noop;

    this.canResize = false;
  }
}

export class SelectColumn extends ColumnView {
  constructor(model) {
    super(model);
  }

  static model(model) {
    return model ? SelectColumn.assign(model) : new SelectColumnModel();
  }
}
