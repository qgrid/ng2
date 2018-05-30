import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';

export declare class SelectColumnModel extends ColumnModel {
	constructor();
}

export declare class SelectColumn extends ColumnView {
	constructor(model: ColumnModel);
}
