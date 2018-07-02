import { ColumnModel } from '../../column-type/column.model';

export interface CellViewPosition {
	readonly rowIndex: number;
	readonly columnIndex: number;
}

export interface CellView extends CellViewPosition {
	readonly row: any;
	readonly column: ColumnModel;
}
