import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { ColumnModel } from './column.model';

export declare class EmailColumnModel extends DataColumnModel {
	constructor();
}

export declare class EmailColumn extends ColumnView {
	constructor(model: ColumnModel);
}
