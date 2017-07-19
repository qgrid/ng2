import {View} from '../view/view';
import {Model} from '../infrastructure/model';

export declare class ColumnView extends View {
	constructor();
	colspan: number;
	rowspan: number;
	static model(model: Model): Model;
	static assign(body: Model): Model;
}
