/**
 * Sorting mode.
 *
 * * `'multiple'` allows to sort by several column keys.
 * * `'single'` allows to sort only by one column key.
 * * `'mixed'` allows to sort multiple columns while Shift key pressed otherwise applies single mode
 */
export declare type SortStateMode = 'single' | 'multiple' | 'mixed';

export declare type SortStateDirection = 'desc' | 'asc';

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
 */
export declare class SortState {
  /**
	 * Ordered list of entries to control sorting.
	 */
  by: string[] | Array<{ [key: string]: SortStateDirection }>;

  /**
	 * Sorting mode.
	 *
	 * * `'multiple'` allows to sort by several column keys.
	 * * `'single'` allows to sort only by one column key.
	 */
  mode: SortStateMode;

  /**
	 * List of triggers that should lead to sorting invalidation.
	 * Default is `['reorder']`.
	 */
  trigger: string[];
}
