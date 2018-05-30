import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';

export declare class RowExpandColumnModel extends ColumnModel {
	constructor();
}

export declare class RowExpandColumn extends ColumnView {
	constructor(model: ColumnModel);
}
