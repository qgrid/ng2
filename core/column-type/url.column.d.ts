import {ColumnView} from '../scene/view/column.view';
import {DataColumnModel} from './data.column.model';
import {ColumnModel} from './column.model';

export declare class UrlColumnModel extends DataColumnModel {
	constructor();
}

export class UrlColumn extends ColumnView {
	constructor(model: ColumnModel);
}
