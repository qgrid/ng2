import { ColumnModel } from '../column-type/column.model';

/**
 * A class that 
 */
export declare class NavigationModel {
	constructor();

	/**
	 * Index of the focused cell row.
	 */
	readonly rowIndex: number;

	/**
	 * Index of the focused cell column. 
	 */
	readonly columnIndex: number;

	/**
	 * Focused cell row.
	 */
	readonly row: any;

	/**
	 * Focused cell column.
	 */
	readonly column: ColumnModel;
}
