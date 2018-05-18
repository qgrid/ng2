import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';

export declare class PadColumnModel extends ColumnModel {
	constructor();
}

export declare class PadColumn extends ColumnView {
	constructor(model: ColumnModel);
}
