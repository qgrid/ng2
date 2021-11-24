import { ColumnModel } from '../column-type/column.model';

export declare function getLabel(row: any, column: ColumnModel): any;
export declare function setLabel(row: any, column: ColumnModel, label: any): void;
export declare function getLabelFactory(column: ColumnModel): (row: any) => any;
