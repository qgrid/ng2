import {ColumnView} from './column.model.view';
import {ColumnModel} from './column.model';
import {Model} from '../infrastructure/model';

declare class RowDetailsColumnModel extends ColumnModel {
	constructor();
}

export declare class RowDetailsColumn extends ColumnView {
	constructor();
	static model(model: Model): Model;
}