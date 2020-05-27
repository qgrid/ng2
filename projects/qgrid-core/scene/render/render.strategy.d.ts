import { ColumnModel, ColumnModelPin } from '../../column-type/column.model';
import { ColumnView } from '../view/column.view';

export declare class RenderStrategy {
	columns(row: any, pin: ColumnModelPin, rowIndex: number): ColumnView[];
	rowspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;
	colspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;

	getValue(row: any, column: ColumnModel, select: (row: any, column: ColumnModel) => any, rowIndex: number, columnIndex: number);
	setValue(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number);
	getLabel(row: any, column: ColumnModel, select: (row: any, column: ColumnModel) => any, rowIndex: number, columnIndex: number);
	setLabel(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number);

	columnList(pin: ColumnModelPin): ColumnView[];
}
