import {ColumnModel} from '../column-type/column.model';

/**
 * A class contains highlight data for rows and columns
 */
export declare  class HighlightModel {
	/**
	 * Set of columns that should be highlighted.
	 */
	columns: ColumnModel[];
	/**
	 * Set of rows that should be highlighted.
	 */
	rows: any[];
}
