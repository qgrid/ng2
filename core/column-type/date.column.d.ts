import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {Model} from "../infrastructure/model";

export declare class DateColumnModel extends DataColumnModel {
	constructor();

	format: string;
}

export declare class DateColumn extends ColumnView {
	constructor(model: Model);

	static model(model: Model): Model;
}