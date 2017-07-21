import {View} from '../view/view';
import {ColumnModel} from '../column-type/column.model';
import {IGetResult} from '../services/value';
import {IPin} from '../visibility/visibility.model';

export interface IGetValueFactory {
  (column: ColumnModel): IGetResult;
}

export declare class BodyView extends View {
  constructor();
  rows: any[];
  columns(row: any, pin: IPin): ColumnModel[];
  rowspan(row: any, column: ColumnModel): number;
  colspan(column: ColumnModel, row: any): number;
  value(row: any, column: ColumnModel, value: any): string;
  label(row: any, column: ColumnModel, value: any): string;
  valueFactory(column: ColumnModel, getValueFactory: IGetValueFactory): IGetResult;
  labelFactory(column: ColumnModel): IGetResult;
}
