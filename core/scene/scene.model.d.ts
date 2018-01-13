import { ColumnView } from './view/column.view';
import { RowView } from './view/row.view';

/**
 * A class that contains results of q-grid invalidate.
 */
export declare class SceneModel {
	constructor();

	/**
	 * Number of invalidations in queue. Is used to understand when dom is ready.
	 */
	round: number;

	/**
	 * Status of invalidation.
	 * 
	 * * `'start'` refresh was began.
	 * * `'stop'` refresh was finished.
	 */
	status: string;

	/**
	 * List of rows to render.
	 */
	rows: RowView[];

	/**
	 * Column rendering object.
	 */
	column: {
		rows: ColumnView[][],
		line: ColumnView[],
		area: {}
	};
}
