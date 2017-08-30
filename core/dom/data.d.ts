import {Model} from '../infrastructure/model';
import {IMapResult} from '../column/column.service';
import {ColumnModel} from '../column-type/column.model';

export declare class Data {
  constructor(model: Model);

  model: Model;

  columns(): ColumnModel[];

  columnMap(): IMapResult;

  rows(): any[];
}
