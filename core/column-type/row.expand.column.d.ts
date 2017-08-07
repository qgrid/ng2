import {ColumnView} from './column.model.view';
import {ColumnModel} from './column.model';
import {Model} from '../infrastructure/model';

declare class RowExpandColumnModel extends ColumnModel {
	constructor();
}

export declare class RowExpandColumn extends ColumnView {
	constructor();
	static model(model: Model): Model;
}