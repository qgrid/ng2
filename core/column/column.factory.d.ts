import {ColumnModel} from '../column-type/column.model';
import {ColumnView} from '../column-type/column.model.view';

export interface IColumnFactoryResult {
  (type: string, body?: any): ColumnView;
}

export declare function columnFactory(model: ColumnModel): IColumnFactoryResult;
