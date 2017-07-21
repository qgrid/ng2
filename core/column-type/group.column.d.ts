import {ColumnView} from './column.model.view';
import {ColumnModel} from './column.model';
import {Model} from '../infrastructure/model';

export declare class GroupColumnModel extends ColumnModel {
	constructor();
}

export declare class GroupColumn extends ColumnView {
	constructor(model: Model);
	static model(model: Model): Model;
}