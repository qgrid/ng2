import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';

export declare class RowNumberColumnModel extends ColumnModel {
	constructor();
}

export declare class RowNumberColumn extends ColumnView {
	constructor(model: ColumnModel);
}
