import {Cell} from "../cell/cell";
import {ColumnModel} from "../column-type/column.model";

export declare class NavigationModel {
	constructor();

	cell: Cell;

	readonly rowIndex: number;

	readonly columnIndex: number;

	readonly row: any;

	readonly column: ColumnModel;
}