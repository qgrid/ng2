import { ColumnModel } from '../../column-type/column.model';
import { ColumnView } from '../view/column.view';

export declare class RenderStrategy {
	columns(row: any, pin: string): ColumnView[];
	rowspan(row: any, column: ColumnView): number;
	colspan(row: any, column: ColumnView): number;
	getValue(row: any, column: ColumnModel);
	setValue(row: any, column: ColumnModel, value: any);
	columnList(pin: string): ColumnView[];
}
