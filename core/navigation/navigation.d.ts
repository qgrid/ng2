import {Model} from "../infrastructure/model";
import {Table} from "../dom/table";
import {ColumnModel} from "../column-type/column.model";
import {Cell} from "../cell/cell";

export interface IPositionResult{
	row: number;
	offset: number;
}

export declare type ReturnColumnOrNumber = ColumnModel | number;

export declare class Navigation {
	constructor(public model: Model, public table: Table);

	positon(y: number, direction: string): IPositionResult;

	goTo(row: any, column: ColumnModel, source: string): void;

	readonly columns: ColumnModel[];

	readonly rows: any[];

	readonly currentColumn: ReturnColumnOrNumber;

	readonly nextColumn: ReturnColumnOrNumber;

	readonly prevColumn: ReturnColumnOrNumber;

	readonly lastColumn: ReturnColumnOrNumber;

	readonly firstColumn: ReturnColumnOrNumber;

	readonly currentRow: any;

	readonly nextRow: any;

	readonly prevRow: any;

	readonly firstRow: any;

	readonly lastRow: any;

	cell(row: any, column: ColumnModel): Cell;

	readonly commands: Map;
}