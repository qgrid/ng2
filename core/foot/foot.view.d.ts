import { View } from '../view/view';
import { Table } from '../dom/table';
import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';

/**
 * > Under Construction.
 */
export declare class FootView extends View {
	constructor(model: Model, table: Table);

	rows: any[];
	columns: ColumnModel[];
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any;

	readonly count: number;

	invalidate(model: Model): void;
	value(column: ColumnModel): any;
}
