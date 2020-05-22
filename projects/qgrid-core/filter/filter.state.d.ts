import { Assert } from './assert';
import { FetchContext } from '../fetch/fetch.context';
import { ColumnModel } from '../column-type/column.model';

/**
 * A class to setup data filters and expressions.
 *
 * ### Usage
 *
 * ```javascript
 * gridModel.filter({
 *    by: {
 *       myTextColumn: {items: ['foo', 'bar']},
 *       myNumberColumn: {expression: {
 *		    kind: 'group',
 *		    op: 'and',
 *		    left: {
 *			   kind: 'condition',
 *			   left: key,
 *			   op: 'in',
 *			   right: ['foo', 'bar']
 *		   },
 *		   right: null
 * 	     }},
 * 	     myBoolColumn: {blanks: true}
 *    }
 * });
 * ```
 */

export declare function match(context: any): (x: any, value: any) => boolean;

export declare type FilterStateMatch = () => (x: any, value: any) => boolean;
export declare type FilterStateFetch = (key: string, context: FetchContext) => any | Promise<any>;

/**
 * Filter representation enum:
 *
 * * `default` filtration through column filters and external plugins.
 * * `row` filtration through header row filter and external plugins.
 */
export declare type FilterStateUnit = 'default' | 'row';

export declare class FilterState {
	/**
	 * Object that contains filter values, `{columnKey: items | blanks | expression}`
	 *
	 * * `items` list of values so when setup works like `in` operator.
	 * * `blanks` boolean value that indicates should we filter blanks values or not.
	 * * `expression` and\or expression
	 */
	by: { [key: string]: any };

	/**
	 * Filter representation enum:
	 */
	unit: FilterStateUnit;

	/**
	 * Factory for the match function.
	 */
	match: FilterStateMatch;

	/**
	 * If setup `column filter` plugin can use this property to populate list of column items.
	 */
	fetch: FilterStateFetch;

	/**
	 * Factory for assertion unit that contains comparison functions.
	 *
	 * * `equals` should return true if two values are equal
	 * * `lessThan` should return true if the first value is less than the second.
	 * * `isNull` should return true if value means null.
	 */
	assertFactory: () => Assert;

	/**
	 * Factory for getting collection of filter operators available for a certain column.
	 */
	operatorFactory: (column: ColumnModel) => string[];
}
