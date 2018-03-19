import { Resource } from '../resource/resource';
import { match } from './match';
import { IAssert } from './assert';

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
 *
 * ### Suggested Links
 *
 * * [filter.pipe.js](https://github.com/qgrid/ng2/blob/master/core/pipe/filter.pipe.js)
 */

export declare function match(context: any): (x: any, value: any) => boolean;

export declare class FilterModel {
	resource: Resource;

	/**
	 * Object that contains filter values, `{columnKey: items | blanks | expression}`
	 *
	 * * `items` list of values so when setup works like `in` operator.
	 * * `blanks` boolean value that indicates should we filter blanks values or not.
	 * * `expression` and\or expression
	 */
	by: object;

	/**
	 * Filter representation enum:
	 *
	 * * `default` filtration through column filters and external plugins.
	 * * `row` filtration through header row filter and external plugins.
	 */
	unit: string;

	/**
	 * Factory for the match function.
	 */
	match: () => match;

	/**
	 * If setup `column filter` plugin can use this property to populate list of column items.
	 */
	fetch: () => any | Promise<any> | any;

	/**
	 * Factory for assertion unit that contains comparison functions.
	 *
	 * * `equals` should return true if two values are equal
	 * * `lessThan` should return true if the first value is less than the second.
	 * * `isNull` should return true if value means null.
	 */
	assertFactory: () => IAssert;
}
