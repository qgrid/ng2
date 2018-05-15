import { ColumnModel } from '../column-type/column.model';

/**
 * A class that responsible for the columns order and generation. Usually user does not interact directly
 * with this model as the q-grid uses this in internal pipelines.
 *
 * ### Usage
 *
 * * Example of how user usually can define column generation type and list of columns in template.
 *
 * ```html
 * <q-grid>
 *    <q-grid-columns generation="deep">
 *       <q-grid-column key="myKey"></q-grid-column>
 *    </q-grid-columns>
 * </q-grid>
 * ```
 *
 * * Example of how user usually can define some options for the all columns of appropriate type.
 *
 * ```html
 * <q-grid>
 *    <q-grid-columns>
 *       <q-grid-column type="number" canSort="false" canFilter="false"></q-grid-column>
 *    </q-grid-columns>
 * </q-grid>
 * ```
 *
 * ### Suggested Links
 *
 * * [Column Model](/doc/api/column-model.html)
 * * [Column Sort](/doc/feature/sort.html)
 * * [column.list.generate.js](https://github.com/qgrid/ng2/blob/master/core/column-list/column.list.generate.js)
 * * [column.list.sort.js](https://github.com/qgrid/ng2/blob/master/core/column-list/column.list.sort.js)
 *
 */
export declare class ColumnListModel {
	constructor();

	/**
	 * When setup columns will be generated automatically based on passed data source.
	 * - `null` means auto generation is off.
	 * - `'deep'` means that algorithm traverses all level keys of the passed data source item.
	 * - `'shallow'` means algoithm traverses only first level keys of the passed data source item.
	 */
	generation: null | 'deep' | 'shallow';

	/**
	 * Contains array of column keys which q-grid uses for column ordering.
	 * This is filled automatically by internal service, but can be modified, for instance,
     * by [column sort](/doc/feature/sort.html) plugin.
	 */
	index: string[];

	/**
	 * List of columns from html template. Usually that kind of column can be
	 * defined with `<q-grid-column>` componet in html,
     * and has `column.source === 'tempate'`.
	 */
	columns: ColumnModel[];

	/**
	 * If user omits key property while defining a column, this column goes to the reference
	 * object as `{columnType: myColumn}`. The reference settings will be applied for all
	 * column of appropriate type as defaults.
	 */
	reference: object;
}
