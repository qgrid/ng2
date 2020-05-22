import { ColumnModel } from '../column-type/column.model';
import { Node } from '../node/node';

/**
 * Use this class to order and generate q-grid columns.
 *
 * ### Setup column generation mode in html.
 *
 * ```html
 * <q-grid>
 *    <q-grid-columns generation="deep">
 *    </q-grid-columns>
 * </q-grid>
 * ```
 *
 * ### Add one column to the qgrid.
 *
 * ```html
 * <q-grid>
 *    <q-grid-columns>
 *       <q-grid-column type="number" [canSort]="false" [canFilter]="false"></q-grid-column>
 *    </q-grid-columns>
 * </q-grid>
 * ```
 * 
 *
 * ### Suggested Links
 *
 * * [Column Model](/doc/api/column-model.html)
 * * [Column Sort](/doc/feature/sort.html)
 * * [column.list.generate.js](https://github.com/qgrid/ng2/blob/master/projects/core/column-list/column.list.generate.js)
 * * [column.list.sort.js](https://github.com/qgrid/ng2/blob/master/projects/core/column-list/column.list.sort.js)
 *
 */
export declare interface ColumnListModel {
	/**
	 * A column generation mode. Here are possible values:
	 * 
	 * - `null` auto generation is off. 
	 * - `deep` number of columns will be equal to number of graph leafs after deep traversing of first row object.
	 * - `shallow` number of columns will be equal to number of keys from first row object.
	 * - `cohort` similar to deep, but use column groups to display hierarchy.
	 */
	generation: null | 'deep' | 'shallow' | 'cohort';

	/**
	 * Array of column keys which q-grid uses for column ordering.
	 * This is filled automatically by internal service, but can be modified, for instance,
     * by [column sort](/doc/feature/sort.html) plugin.
	 */
	index: Node;

	/**
	 * List of columns from html template. Usually that kind of column can be
	 * defined with `<q-grid-column>` component in html,
     * and has `column.source === 'template'`.
	 */
	columns: ColumnModel[];

	/**
	 * If user omits key property while defining a column, this column goes to the reference
	 * object as `{columnType: myColumn}`. The reference settings will be applied for all
	 * column of appropriate type as defaults.
	 */
	reference: { [type: string]: ColumnModel };

	/**
	 * Flatten list of data columns, filled automatically on data columns changes.
	 */
	line: ColumnModel[];
}
