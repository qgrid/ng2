import { ColumnModel } from '../column-type/column.model';
import { Cell } from './cell';
import { Column } from './column';
import { Row } from './row';
import { Bag } from './bag';

export interface IBoxMapper {
	row(): any;
	column(): (columnIndex: number) => ColumnModel;
	rowBack(): any;
	columnBack(): any;
}

export interface IBoxContext {
	mapper: IBoxMapper;
	layer: any;
	bag: {
		body: Bag,
		head: Bag,
		foot: Bag
	};
}

export declare class Box {
	constructor(context: IBoxContext);

	context: IBoxContext;

	cell(rowIndex: number, columnIndex: number): Cell;
	column(columnIndex: number): Column;
	columns(rowIndex: number): Column[];
	row(rowIndex: number): Row;
	rows(columnIndex: number): Row[];
	rowCount(columnIndex: number): number;
	columnCount(rowIndex: number): number;
}
