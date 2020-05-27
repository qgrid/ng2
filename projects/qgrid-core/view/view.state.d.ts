import { ColumnModel } from '../column-type/column.model';
import { PipePivot } from '../pipe/pipe.types';

/**
 * A class that represent a raw data to render.
 */
export declare class ViewState {
	/**
	 * List of data rows to render.
	 */
	rows: any[];

	/**
	 * The last row of columns that should be rendered.
	 */
	columns: ColumnModel[];

	/**
	 * List of nodes to render.
	 */
	nodes: Node[];

	/**
	 * Pivoted data structure to render.
	 */
	pivot: PipePivot;
}
