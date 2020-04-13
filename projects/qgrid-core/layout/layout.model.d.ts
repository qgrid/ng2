import { ColumnModel } from '../column-type/column.model';

/**
 * A class contains rewritten widthes and heights of rows and columns
 *
 * ### Suggested Links
 * * [Layout View](/doc/api/layout-view.html)
 */
export declare interface LayoutModel {
	/**
	 * Set of column sizes.
	 */
	columns?: Map<string, any>;

	/**
	 * Set of row sizes.
	 */
	rows?: Map<any, any>;
}
