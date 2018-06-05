import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';

export declare class GroupColumnModel extends ColumnModel {
	by?: string;
}

export declare class GroupColumn extends ColumnView {
	constructor(model: ColumnModel);
}
