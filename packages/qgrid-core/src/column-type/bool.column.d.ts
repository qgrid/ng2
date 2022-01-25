import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { ColumnModel } from './column.model';

export declare class BoolColumnModel extends DataColumnModel {
	trueValue?: any;
	falseValue?: any;
	isIndeterminate?: ((x: any) => boolean) | any;
	isChecked?: ((x: any) => boolean) | any;
}

export declare class BoolColumn extends ColumnView {
	constructor(model: ColumnModel);
}
