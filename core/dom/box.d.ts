import {ColumnModel} from '../column-type/column.model';
import {Model} from '../infrastructure/model';
import {Cell} from './cell';
import {Column} from './column';

export interface IsDataRow{
	(row: any): boolean;
}

export interface IContext{
	mapper: IMapper;
	layer: any;
	model: (elem: Element) => any;
	isDataRow: IsDataRow;
}

export interface IMapper{
	row(): any;
	column(): IColumn;
	rowBack(): any;
	columnBack(): any;
}

export interface IColumn{
	(columnIndex: number): ColumnModel;
}

export declare class Box {
	constructor(context: IContext);
	context: IContext;
	cell(rowIndex: number, columnIndex: number): Cell;
	column(index: number): Column;
	row(index: number): any;
	rows(): any[];
	rowCount(): number;
	columnCount(): number;
	getElements(): any[];
}
