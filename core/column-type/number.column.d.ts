import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {Model} from '../infrastructure/model';

export declare class NumberColumnModel extends DataColumnModel {
	constructor();
	format: string;
}

export declare class NumberColumn extends ColumnView {
	constructor();
	static model(model: Model): Model;
}