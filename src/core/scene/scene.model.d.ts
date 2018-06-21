import { ColumnView } from './view/column.view';
import { RowView } from './view/row.view';

/**
 * A class that contains results of q-grid invalidate.
 *
 * ### Suggested Links
 * [table.js](https://github.com/qgrid/ng2/blob/master/src/core/dom/table.js)
 */
export declare interface SceneModel {
	/**
	 * Number of invalidations in queue. Is used to understand when dom is ready.
	 */
	round?: number;

	/**
	 * Status of invalidation.
	 *
	 * * `'start'` refresh was began.
	 * * `'stop'` refresh was finished.
	 */
	status?: string;

	/**
	 * List of rows to render.
	 */
	rows?: RowView[];

	/**
	 * Column rendering object.
	 */
	column?: {
		rows: ColumnView[][],
		line: ColumnView[],
		area: {}
	};
}
