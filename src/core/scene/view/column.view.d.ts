import { Model } from '../../infrastructure/model';
import { ColumnModel } from '../../column-type/column.model';

export declare class ColumnView {
	model: ColumnModel;
	colspan: number;
	rowspan: number;
	index: number;
}
