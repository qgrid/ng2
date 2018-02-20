import {ColumnView} from '../scene/view/column.view';
import {DataColumnModel} from './data.column.model';
import {ColumnModel} from './column.model';

export declare class RowOptionsColumnModel extends DataColumnModel {
	constructor();
}

export declare class RowOptionsColumn extends ColumnView {
	constructor(model: ColumnModel);
}
