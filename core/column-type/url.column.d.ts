import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {Model} from '../infrastructure/model';

export declare class UrlColumnModel extends DataColumnModel {
	constructor();
}

export class UrlColumn extends ColumnView {
	constructor();
	static model(model: Model): Model;
}