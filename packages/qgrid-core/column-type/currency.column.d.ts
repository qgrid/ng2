import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';
import { DataColumnModel } from './data.column.model';

export declare class CurrencyColumnModel extends DataColumnModel {
	symbol?: string;
	code?: string;
	maxLength?: number;
}

export declare class CurrencyColumn extends ColumnView {
	constructor(model: ColumnModel);
}
