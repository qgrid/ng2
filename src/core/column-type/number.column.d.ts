import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { ColumnModel } from './column.model';

export declare class NumberColumnModel extends DataColumnModel {
	format?: string;
}

export declare class NumberColumn extends ColumnView {
	constructor(model: ColumnModel);
}
