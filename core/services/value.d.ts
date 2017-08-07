import {ColumnModel} from '../column-type/column.model';

export interface IGetFactoryResult {
	(row: any): IGetFactory;
}

export interface IGetFactory {
	(row: any, column: ColumnModel): IGetResult;
}

export interface IGetResult {
	(row: any, value?: any): any;
}

export interface IValueFactory {
	(column: ColumnModel): any;
}

export declare function get(row: any, column: ColumnModel): IGetResult;
export declare function getFactory(column: ColumnModel): IGetFactoryResult;
export declare function set(row: object, column: ColumnModel, value: string): void;
