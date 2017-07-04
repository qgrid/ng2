import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {Model} from "../infrastructure/model";

export declare class UrlColumnModel extends DataColumnModel {
	constructor();
}

export class UrlColumn extends ColumnView {
	constructor(model: Model);

	static model(model: Model): Model;
}