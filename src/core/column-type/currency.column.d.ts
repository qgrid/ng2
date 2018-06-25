import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { ColumnModel } from './column.model';

export declare class CurrencyColumnModel extends DataColumnModel {
	symbol?: string;
	code?: string;
	maxLength?: number;
}

export declare class CurrencyModel extends ColumnView {
	constructor(model: ColumnModel);
}
