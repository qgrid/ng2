import { ColumnModel } from '../column-type/column.model';
import { CellView } from '../scene/view/cell.view';

/**
 * A class that gives access to the current cell position inside the q-grid.
 *
 * ### Suggested Links
 *
 * * [Navigation View](/doc/api/navigation-view.html)
 * * [navigation.js](https://github.com/qgrid/ng2/blob/master/projects/core/navigation/navigation.js)
 */
export declare interface NavigationModel {
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
