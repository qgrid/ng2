import { ColumnModel } from '../../column-type/column.model';

export declare class CellView {
	value: any;
	label: any;
	column: ColumnModel;
	row: any;
	model: any;

	mode(value: string): void;
}
