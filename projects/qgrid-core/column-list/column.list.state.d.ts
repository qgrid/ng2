import { ColumnModel } from '../column-type/column.model';
import { Node } from '../node/node';

/**
 * A column generation mode. Here are possible values:
 * 
 * - `null` auto generation is off. 
 * - `deep` number of columns will be equal to number of graph leafs after deep traversing of first row object.
 * - `shallow` number of columns will be equal to number of keys from first row object.
 * - `cohort` similar to deep, but use column groups to display hierarchy.
 */
export declare type ColumnListStateGeneration = null | 'deep' | 'shallow' | 'cohort';

export declare type ColumnListStateTypeDetection = 'inference' | 'raw';

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
 */
export declare class ColumnListState {
	/**
	 * A column generation mode. Here are possible values:
	 */
	generation: ColumnListStateGeneration;

	typeDetection: ColumnListStateTypeDetection;

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
