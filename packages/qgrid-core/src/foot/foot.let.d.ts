import { ColumnModel, ColumnModelPin } from '../column-type/column.model';
import { Model } from '../model/model';
import { GridPlugin } from '../plugin/grid.plugin';
import { ColumnView } from '../scene/view/column.view';

export declare class FootLet {
  readonly count: number;
  readonly rows: any[];
  valueFactory: (column: ColumnModel) => (row: any, value?: any) => any;

  constructor(plugin: GridPlugin);

  columns(row: any, pin: ColumnModelPin): ColumnView[];
  invalidate(model: Model): void;
  value(column: ColumnModel): any;
}
