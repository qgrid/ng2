import { ColumnModel } from '../column-type/column.model';
import { Table } from '../dom/table';

export declare class VirtualRowStyle {
	constructor(table: Table, style: (row: any, context: any) => void);

	visitFactory(): (row: any, context: object) => void;
}

export declare class VirtualCellStyle {
	constructor(table: Table, style: (row: any, column: ColumnModel, context: any) => void);

	visitFactory(): (row: any, column: ColumnModel, context: object) => void;
}
