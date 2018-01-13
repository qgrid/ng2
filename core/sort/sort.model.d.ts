import {Resource} from '../resource/resource';
import {ModeType} from '../selection/selection.model';

/**
 * A class that allows to control sorting.
 * 
 * ## Usage
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
 */
export declare class SortModel {
	constructor();
	resource: Resource;

	/**
	 * Ordered list of entries to control sorting.
	 */
	by: any[];

	/**
	 * Sorting mode.
	 * 
	 * * `'multiple'` allows to sort by several column keys.
	 * * `'single'` allows to sort only by one column key.
	 */
	mode: string;

	/**
	 * List of triggers that should lead to sorting invalidation.
	 * Default is `['reorder']`.
	 */
	trigger: string[];
}
