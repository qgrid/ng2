import {View} from '../view/view';
import {IGetValue} from '../services/aggregation';
import {IValueFactory} from '../services/value';
import {Table} from '../dom/table';
import {ColumnModel} from '../column-type/column.model';
import {Model} from '../infrastructure/model';

export declare class FootView extends View {
	constructor();
	rows: any[];
	columns: ColumnModel[];
	valueFactory: IValueFactory;
	invalidate(model: Model): void;
	readonly count: number;
	value(column: ColumnModel): IGetValue;
}
