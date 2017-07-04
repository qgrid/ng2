import {ColumnModel} from "../column-type/column.model";

export declare interface ICell{
	rowIndex: number;
	columnIndex: number;
	column: ColumnModel;
	row: any;
	value: any;
	label: any;
}

export declare class Cell {

	constructor(public cell: ICell);

	get value(): any;

	set value(value: any);

	get label(): any;

	set label(label: any);

	mode(value: string): void;
}