import {ColumnView} from './column.model.view';
import {ColumnModel} from './column.model';
import {Model} from "../infrastructure/model";

export declare class RowIndicatorColumnModel extends ColumnModel {
	constructor();
}

export declare class RowIndicatorColumn extends ColumnView {
	constructor(model: Model);

	static model(model: Model): Model;
}