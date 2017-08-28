import {ColumnModel} from '../column-type/column.model';
import {Cell} from '../scene/cell';

export interface IPositionResult {
	row: number;
	offset: number;
}

export declare type ReturnColumnOrNumber = ColumnModel | number;

export declare class Navigation {
	constructor();

	get currentColumn(): Number;

	get nextColumn(): Number;

	get prevColumn(): Number;

	get lastColumn(): Number;

	get firstColumn(): Number;

	get currentRow(): Number;

	get nextRow(): Number;

	get prevRow(): Number;

	get firstRow(): Number;

	get lastRow(): Number;
}
