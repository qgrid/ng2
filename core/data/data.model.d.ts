import { ColumnModel } from '../column-type/column.model';
import { IPipe } from '../pipe/pipe.item';

/**
 * A class that gives access to the high level grid data structures.
 *
 * ## Usage
 * Usually grid user can define this properties in different places.
 * Inside html through attribute bindings:
 * ```html
 * <q-grid [columns]="userColumns" [rows]="userRows">
 * ```
 *
 * Inside html throught component:
 * ```html
 * <q-grid>
 * 	<q-grid-columns>
 * 		<q-grid-column key="id"></q-grid-column>
 * 		<q-grid-column key="name"><q-grid-column>
 * 	</q-grid-columns>
 * </q-grid>
 * ```
 *
 * Inside js code throught model:
 * ```javascript
 * const userRows = [];
 * const userColumns = [];
 *
 * gridModel.data({
 *  rows: userRows,
 *  columns: userColumns
 * })
 * ```
 */
export declare class DataModel {

	/**
	 * List of rows to display.
	 * Rows property can be filled from the grid rows html or grid model data rows
     * property.
	 */
    rows: any[];

	/**
	 * Set of columns to display.
	 * Usually data columns can be setup from 3 places:
     *
     * 1. Columns binding property.
     * 2. Columns component.
     * 3. Grid model data columns property.
     *
	 * We can have 3 sources of columns because each column has `key` property,
     * that allows to make a merge. If you have defined columns in javascript and in template
     * with the same key, algorithm will try persist settings from both sources but
     * javascript will have top priority.
	 */
    columns: ColumnModel[];

	/**
	 * Chaing of methods that grid invokes asyncroniuosly anytime refresh is required,
	 * see `PipeModel` that contains information when grid demands refreshing.
	 */
    pipe: IPipe[];
}
