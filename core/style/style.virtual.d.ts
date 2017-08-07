import {Table} from "../dom/table";
import {Model} from "../infrastructure/model";
import {ColumnModel} from "../column-type/column.model";

export interface IRowApplyFactoryResult{
	(row: any, context: object): void;
}

export interface ICellApplyFactoryResult{
	(row: any, column: ColumnModel, context: object): void;
}

export declare class VirtualRowStyle {
	constructor(public table: Table);

	 model: Model;


	applyFactory(): IRowApplyFactoryResult;
}

export declare class VirtualCellStyle {
	constructor(public table: Table);

	model: Model;

	applyFactory(): ICellApplyFactoryResult;

}