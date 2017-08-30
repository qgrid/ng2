import {ColumnModel} from '../../column-type/column.model';

export interface ICellModel {
	rowIndex: number;
	columnIndex: number;
	column: ColumnModel;
	row: any;
	value: any;
	label: any;
}

export declare class CellView {
	constructor(model: ICellModel);

	value: any;
	label: any;

	mode(value: string): void;
}
