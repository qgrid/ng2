import { ColumnModel } from '../column-type/column.model';

/**
 * A class that gives access to the current cell position inside the q-grid.
 *
 * ### Suggested Links
 *
 * * [Navigation View](/doc/api/navigation-view.html)
 * * [navigation.js](https://github.com/qgrid/ng2/blob/master/core/navigation/navigation.js)
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
