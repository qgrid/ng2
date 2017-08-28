import {ColumnView} from '../scene/view/column.view';
import {ColumnModel} from './column.model';

export declare class FilterRowColumnModel extends ColumnModel {
	constructor();

	sourceKey: string;
	sourceType: string;
}

export declare class FilterRowColumn extends ColumnView {
	constructor(model: ColumnModel);
}
