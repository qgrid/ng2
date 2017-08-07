import {ColumnView} from './column.model.view';
import {ColumnModel} from './column.model';
import {Model} from '../infrastructure/model';

export declare class SelectColumnModel extends ColumnModel {
	constructor();
}

export declare class SelectColumn extends ColumnView {
	constructor();
	static model(model: Model): Model;
}