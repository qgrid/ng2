import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { ColumnModel } from './column.model';

export declare class PasswordColumnModel extends DataColumnModel {
	constructor();
}

export declare class PasswordColumn extends ColumnView {
	constructor(model: ColumnModel);
}
