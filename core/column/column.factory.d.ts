import {Model} from '../infrastructure/model';
import {ColumnView} from '../column-type/column.model.view';

export interface IColumnFactoryResult {
  (type: string, body?: any): ColumnView;
}

export declare function columnFactory(model: Model): IColumnFactoryResult;
