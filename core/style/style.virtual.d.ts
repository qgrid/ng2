import {ColumnModel} from '../column-type/column.model';

export interface IRowApplyFactoryResult{
	(row: any, context: object): void;
}

export interface ICellApplyFactoryResult{
	(row: any, column: ColumnModel, context: object): void;
}

export declare class VirtualRowStyle {
	constructor();
	applyFactory(): IRowApplyFactoryResult;
}

export declare class VirtualCellStyle {
	constructor();
	applyFactory(): ICellApplyFactoryResult;
}
