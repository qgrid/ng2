import { Table } from '../dom/table';
import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';

/**
 * > Under Construction.
 */
export declare class FootView {
	constructor(model: Model, table: Table);

	readonly count: number;
	rows: any[];

	columns(row: any, pin: string);
	invalidate(model: Model): void;
	value(column: ColumnModel): any;
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any;
}
