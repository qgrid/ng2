import {ColumnView} from '../scene/view/column.view';
import {DataColumnModel} from './data.column.model';
import {ColumnModel} from './column.model';

export declare class ReferenceColumnModel extends DataColumnModel {
	constructor();
}

export class ReferenceColumn extends ColumnView {
	constructor(model: ColumnModel);
}
