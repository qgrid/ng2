import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {Model} from "../infrastructure/model";

export declare class BoolColumnModel extends DataColumnModel {
	constructor();
}

export declare class BoolColumn extends ColumnView {
	constructor(model: Model);
}