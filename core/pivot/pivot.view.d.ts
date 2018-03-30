import { View } from '../view/view';
import { Model } from '../infrastructure/model';
import { ColumnModel } from '../column-type/column.model';

/**
 * > Under Construction.
 */
export declare class PivotView extends View {
	constructor(model: Model);

	rows: any[];
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any;

	invalidate(model: Model): void;
	value(row: any, column: ColumnModel): any;
}
