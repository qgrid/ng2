import { ColumnModel } from '../column-type/column.model';
import { Model } from '../model/model';

export declare class Data {
  model: Model;

  constructor(model: Model);

  columns(): ColumnModel[];
  columnMap(): { [key: string]: ColumnModel };
  rows(): any[];
}
