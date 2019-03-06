import { ColumnModel } from '../column-type/column.model';

export declare function get(row: any, column: ColumnModel): any;
export declare function set(row: any, column: ColumnModel, value: any): void;
export declare function getFactory(column: ColumnModel): (row: any) => any;
