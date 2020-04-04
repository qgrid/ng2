import { Resource } from '../resource/resource';

/**
 * A class that allows to control sorting.
 *
 * ### Usage
 * ```javascript
 * gridModel.sort({
 *    by: [{myColumnKey: 'asc', myOtherColumnKey: 'desc'}]
 * });
 *
 * // In the nearest future
 * gridModel.sort({
 *    by: ['+myColumnKey', '-myOtherColumnKey']
 * });
 * ```
 *
 * ### Suggested Links
 *
 * * [Sort View](/doc/api/sort-view.html)
 * * [sort.pipe.js](https://github.com/qgrid/ng2/blob/master/core/pipe/sort.pipe.js)
 */
export declare interface SortModel {
	/**
	 * Ordered list of entries to control sorting.
	 */
	by?: string[] | Array<{ [key: string]: 'desc' | 'asc' }>;

	/**
	 * Sorting mode.
	 *
	 * * `'multiple'` allows to sort by several column keys.
	 * * `'single'` allows to sort only by one column key.
	 */
	mode?: 'single' | 'multiple';

	/**
	 * List of triggers that should lead to sorting invalidation.
	 * Default is `['reorder']`.
	 */
	trigger?: string[];
}
