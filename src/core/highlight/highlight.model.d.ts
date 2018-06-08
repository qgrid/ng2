import { TdPosition } from '../dom/td';

/**
 * A class contains highlight data for rows and columns
 */
export declare interface HighlightModel {
	/**
	 * Set of columns that should be highlighted.
	 */
	columns?: string[];

	/**
	 * Set of rows that should be highlighted.
	 */
	rows?: number[];

	cell?: TdPosition;
}
