import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';

export declare class GroupColumnModel extends ColumnModel {
	constructor();
}

export declare class GroupColumn extends ColumnView {
	constructor(model: ColumnModel);
}
