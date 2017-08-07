import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {Model} from '../infrastructure/model';

export declare class ReferenceColumnModel extends DataColumnModel {
	constructor();
}

export class ReferenceColumn extends ColumnView {
	constructor();
	static model(model: Model): Model;
}