import { ColumnModel } from '../column-type/column.model';

export declare function get(row: any, column: ColumnModel): (row: any, value?: any) => any;
export declare function set(row: object, column: ColumnModel, value: string): void;
export declare function getFactory(column: ColumnModel): (row: any, label?: any) => any;
