import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {Model} from '../infrastructure/model';

export declare class EmailColumnModel extends DataColumnModel {
	constructor();
}

export declare class EmailColumn extends ColumnView {
	constructor();
	static model(model: Model): Model;
}