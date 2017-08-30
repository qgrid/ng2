import {ColumnModel} from '../column-type/column.model';

export interface IPositionResult {
	row: number;
	offset: number;
}

export declare type ReturnColumnOrNumber = ColumnModel | number;

export declare class Navigation {
	constructor();

	currentColumn(): Number;

	nextColumn(): Number;

	prevColumn(): Number;

	lastColumn(): Number;

	firstColumn(): Number;

	currentRow(): Number;

	nextRow(): Number;

	prevRow(): Number;

	firstRow(): Number;

	lastRow(): Number;
}
