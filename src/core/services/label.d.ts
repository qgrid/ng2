import { ColumnModel } from '../column-type/column.model';

export declare function get(row: object, column: ColumnModel): (row: any, label?: any) => any;
export declare function set(row: object, column: ColumnModel, label: object): void;
export declare function getFactory(column: ColumnModel): (row: any, label?: any) => any;
