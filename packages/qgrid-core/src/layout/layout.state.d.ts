import { ColumnModel } from '../column-type/column.model';

/**
 * A class contains rewritten widths and heights of rows and columns
 */
export declare class LayoutState {
	/**
	 * Set of column sizes.
	 */
	columns: Map<string, any>;

	/**
	 * Set of row sizes.
	 */
	rows: Map<any, any>;
}
