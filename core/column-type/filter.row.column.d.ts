import {ColumnView} from './column.model.view';
import {ColumnModel} from './column.model';
import {Model} from '../infrastructure/model';

export declare class FilterRowColumnModel extends ColumnModel {
	constructor(model: Model);
	sourceKey: string;
	sourceType: string;
}

export declare class FilterRowColumn extends ColumnView {
	constructor(model: Model);
}