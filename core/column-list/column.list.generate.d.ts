import {ColumnModel} from '../column-type/column.model';

export interface IColumnFactory {
  (type: string): ColumnModel;
}

export declare function generate(rows: any[], columnFactory: IColumnFactory, deep: boolean): ColumnModel[];
