import {Model} from '../infrastructure/model';
import {ColumnView} from '../scene/view/column.view';

export interface IColumnFactoryResult {
  (type: string, body?: any): ColumnView;
}

export declare function columnFactory(model: Model): IColumnFactoryResult;
