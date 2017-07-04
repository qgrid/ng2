import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {Model} from "../infrastructure/model";

export declare class TextColumnModel extends DataColumnModel {
	constructor();

	maxLength: number;
}

export declare class TextColumn extends ColumnView {
	constructor(model: Model);

	static model(model: Model): Model;
}