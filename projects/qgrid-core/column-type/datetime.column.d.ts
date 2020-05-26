import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { ColumnModel } from './column.model';

export declare class DateTimeColumnModel extends DataColumnModel {
	format?: string;
}

export declare class DateTimeColumn extends ColumnView {
	constructor(model: ColumnModel);
}
