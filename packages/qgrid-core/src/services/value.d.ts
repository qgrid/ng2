import { ColumnModel } from '../column-type/column.model';

export declare function getValue(row: any, column: ColumnModel): any;
export declare function setValue(row: any, column: ColumnModel, value: any): void;
export declare function getValueFactory(column: ColumnModel): (row: any) => any;
