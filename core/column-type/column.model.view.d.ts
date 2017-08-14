import {Model} from '../infrastructure/model';
import {ColumnModel} from './column.model';

export declare class ColumnView {
	constructor(model: ColumnModel);

	model: ColumnModel
	colspan: number;
	rowspan: number;

	static model(model: Model): Model;

	static assign(body: Model): Model;
}
