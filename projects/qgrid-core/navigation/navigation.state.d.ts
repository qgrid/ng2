import { ColumnModel } from '../column-type/column.model';
import { CellView } from '../scene/view/cell.view';

/**
 * A class that gives access to the current cell position inside the q-grid.
 */
export declare class NavigationState {
	/**
	 * Get index of the focused cell row.
	 */
	rowIndex: number;

	/**
	 * Get index of the focused cell column.
	 */
	columnIndex: number;

	/**
	 * Get focused cell row.
	 */
	row: any;

	/**
	 * Get focused cell column.
	 */
	column: ColumnModel;

	/**
	 * Set/get a focused cell
	 */
	cell: CellView;
}
