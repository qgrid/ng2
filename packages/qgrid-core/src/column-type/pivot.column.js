import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { ColumnModel } from './column.model';

TemplatePath.register('pivot-cell', template => ({
  model: 'pivot',
  resource: template.for,
}));

export class PivotColumnModel extends ColumnModel {
  constructor() {
    super('pivot');

    this.key = '$pivot';
    this.title = 'Pivot';

    this.source = 'generation';
    this.category = 'pivot';
    this.canEdit = false;
    this.canSort = false;
    this.canResize = false;
    this.canFilter = false;
    this.canMove = false;
  }
}

export class PivotColumn extends ColumnView {
  constructor(model) {
    super(model);
  }

  static model(model) {
    return model ? PivotColumn.assign(model) : new PivotColumnModel();
  }
}
