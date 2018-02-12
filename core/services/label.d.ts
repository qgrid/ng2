import { ColumnModel } from '../column-type/column.model';

export interface ILabel {
	(row: any, label?: any): any;
}

export interface ILabelFactory {
	(row: any): ILabel;
}

export declare function get(row: object, column: ColumnModel): ILabel;
export declare function getFactory(column: ColumnModel): ILabelFactory;
export declare function set(row: object, column: ColumnModel, label: object): void;
