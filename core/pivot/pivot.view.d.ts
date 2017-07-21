import {View} from '../view/view';
import {IValueFactory} from '../services/value';
import {Model} from '../infrastructure/model';
import {ColumnModel} from '../column-type/column.model';

export declare class PivotView extends View {
	constructor(model: Model);
	rows: any[];
	valueFactory: IValueFactory;
	invalidate(model: Model): void;
	value(row: any, column: ColumnModel): any;
}
