import {ColumnModel, ILabel} from '../column-type/column.model';

export interface IGetResult{
	(row: any): any;
}

export declare function get(row: object, column: ColumnModel): ILabel;
export declare function getFactory(column: ColumnModel): IGetResult;
export declare function set(row: object, column: ColumnModel, label: object): void;