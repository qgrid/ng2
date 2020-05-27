import { CellViewPosition } from '../scene/view/cell.view';

/**
 * A class contains highlight data for rows and columns
 */
export declare class HighlightState {
	/**
	 * Set of columns that should be highlighted.
	 */
	columns: string[];

	/**
	 * Set of rows that should be highlighted.
	 */
	rows: number[];

	cell: CellViewPosition;
}
