import {ColumnModel} from '../column-type/column.model';

export interface IPositionResult {
	row: number;
	offset: number;
}

export declare type ReturnColumnOrNumber = ColumnModel | number;

export declare class Navigation {
	constructor();

	currentColumn(): number;
	nextColumn(): number;
	prevColumn(): number;
	lastColumn(): number;
	firstColumn(): number;
	currentRow(): number;
	nextRow(): number;
	prevRow(): number;
	firstRow(): number;
	lastRow(): number;
}
