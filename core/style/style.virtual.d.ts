import { ColumnModel } from '../column-type/column.model';
import { Table } from '../dom/table';

export declare class VirtualRowStyle {
	constructor(table: Table);

	applyFactory(): (row: any, context: object) => void;
}

export declare class VirtualCellStyle {
	constructor(table: Table);

	applyFactory(): (row: any, column: ColumnModel, context: object) => void;
}
