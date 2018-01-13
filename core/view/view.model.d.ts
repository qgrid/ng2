import { ColumnModel } from '../column-type/column.model';
import { IPivot } from '../pipe/pipe.item';

/**
 * A class 
 */
export declare class ViewModel {
	constructor();

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
	 * Pivot data to render.
	 */
	pivot: IPivot;
}
