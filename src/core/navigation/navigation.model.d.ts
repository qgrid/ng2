import { ColumnModel } from '../column-type/column.model';

/**
 * A class that gives access to the current cell position inside the q-grid.
 *
 * ### Suggested Links
 *
 * * [Navigation View](/doc/api/navigation-view.html)
 * * [navigation.js](https://github.com/qgrid/ng2/blob/master/core/navigation/navigation.js)
 */
export declare interface NavigationModel {
	/**
	 * Index of the focused cell row.
	 */
	readonly rowIndex?: number;

	/**
	 * Index of the focused cell column.
	 */
	readonly columnIndex?: number;

	/**
	 * Focused cell row.
	 */
	readonly row?: any;

	/**
	 * Focused cell column.
	 */
	readonly column?: ColumnModel;

	/**
	 * Appropriate framework tick timeout while navigation by keyboard is occured.
	 * * For angularjs - digest is called.
	 * * For angular - ApplicationRef.tick is called.
	 */
	debounce?: number;

	cell?: {
		rowIndex: number,
		columnIndex: number,
		row: any,
		column: ColumnModel
	};
}
