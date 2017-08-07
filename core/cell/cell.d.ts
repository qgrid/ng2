import {ColumnModel} from '../column-type/column.model';

export interface ICell {
	rowIndex: number;
	columnIndex: number;
	column: ColumnModel;
	row: any;
	value: any;
	label: any;
}

export declare class Cell {
	constructor(cell: ICell);
	value: any;
	label: any;
	mode(value: string): void;
}
