import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { ColumnModel } from './column.model';

export declare class BoolColumnModel extends DataColumnModel {
	constructor();

	trueValue: any;
	falseValue: any;
	isIndeterminate: (x: any) => boolean;
	isChecked: (x: any) => boolean;
}

export declare class BoolColumn extends ColumnView {
	constructor(model: ColumnModel);
}
