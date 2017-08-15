import {View} from '../view/view';
import {ColumnModel} from '../column-type/column.model';
import {IGetResult} from '../services/value';
import {Model} from '../infrastructure/model';
import {Table} from '../dom/table';
import {ColumnView} from '../column-type/column.model.view';

export interface IGetValueFactory {
  (column: ColumnModel): IGetResult;
}

export declare class BodyView extends View {
  constructor(model: Model, table: Table);

  rows: any[];

  columns(row: any, pin: string): ColumnView[];

  rowspan(): number;

  colspan(row: any, column: ColumnModel): number;

  value(row: any, column: ColumnModel, value?: any): string;

  label(row: any, column: ColumnModel, value?: any): string;

  valueFactory(column: ColumnModel, getValueFactory: IGetValueFactory): IGetResult;

  labelFactory(column: ColumnModel): IGetResult;
}
