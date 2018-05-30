import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { ColumnModel } from './column.model';

export declare class IdColumnModel extends DataColumnModel {
	constructor();
}

export declare class IdColumn extends ColumnView {
	constructor(model: ColumnModel);
}
