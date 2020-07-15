import { ColumnModel } from '../../column-type/column.model';

export declare class ColumnView {
	readonly model: ColumnModel;
	readonly colspan: number;
	readonly rowspan: number;
	readonly columnIndex: number;
	readonly rowIndex: number;
}
