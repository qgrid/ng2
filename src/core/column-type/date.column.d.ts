import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { ColumnModel } from './column.model';

export declare class DateColumnModel extends DataColumnModel {
	constructor();

	format: string;
}

export declare class DateColumn extends ColumnView {
	constructor(model: ColumnModel);
}
