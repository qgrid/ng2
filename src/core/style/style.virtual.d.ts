import {ColumnModel} from '../column-type/column.model';
import {Table} from '../dom/table';

export interface IRowApplyFactoryResult {
	(row: any, context: object): void;
}

export interface ICellApplyFactoryResult {
	(row: any, column: ColumnModel, context: object): void;
}

export declare class VirtualRowStyle {
	constructor(table: Table);

	applyFactory(): IRowApplyFactoryResult;
}

export declare class VirtualCellStyle {
	constructor(table: Table);

	applyFactory(): ICellApplyFactoryResult;
}
