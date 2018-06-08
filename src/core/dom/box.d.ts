import { ColumnModel } from '../column-type/column.model';
import { Cell } from './cell';
import { Column } from './column';
import { Row } from './row';
import { Bag } from './bag';

export interface BoxMapper {
	row(): any;
	column(): (columnIndex: number) => ColumnModel;
	rowBack(): any;
	columnBack(): any;
}

export interface BoxContext {
	mapper: BoxMapper;
	layer: any;
	bag: {
		body: Bag,
		head: Bag,
		foot: Bag
	};
}

export declare class Box {
	constructor(context: BoxContext);

	cell(rowIndex: number, columnIndex: number): Cell;
	column(columnIndex: number): Column;
	columns(rowIndex: number): Column[];
	row(rowIndex: number, columnIndex?: number): Row;
	rows(columnIndex: number): Row[];
	rowCount(columnIndex: number): number;
	columnCount(rowIndex: number): number;
}
