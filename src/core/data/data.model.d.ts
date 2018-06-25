import { ColumnModel } from '../column-type/column.model';
import { PipeContext } from '../pipe/pipe.item';
import { ColumnView } from '../scene/view/column.view';

/**
 * Use this class to get access to the high level q-grid data structures.
 *
 * ### Usage
 * In html through attribute bindings:
 * ```html
 * <q-grid [columns]="myColumns" [rows]="myRows">
 * </q-grid>
 * ```
 *
 * In html via component:
 * ```html
 * <q-grid>
 * 	<q-grid-columns>
 * 		<q-grid-column key="id" title="ID" type="id"></q-grid-column>
 * 		<q-grid-column key="myColumnKey" title="My Column Name"><q-grid-column>
 * 	</q-grid-columns>
 * </q-grid>
 * ```
 *
 * In js code throught model:
 * ```javascript
 * const myRows = [];
 * const myColumns = [];
 *
 * gridModel.data({
 *  rows: myRows,
 *  columns: myColumns
 * });
 * ```
 *
 * ### Suggested Links
 *
 * * [qgrid Model](/doc/api/model)
 * * [Data Pipe](/doc/api/data-pipe)
 */
export declare interface DataModel {

	/**
 	 * A list of data rows to display. 
	 */
	rows?: any[];

	/**
	 * A set of columns to display. 
	 * q-grid makes it possible to add columns from various sources and then merge 
	 * them due to each column having a key property. Note that if you have defined columns in 
	 * javascript and template with the same key, algorithm tries to keep the setting from both 
	 * sources but javascript will have a top priority.
	 */
	columns?: ColumnModel[];

	/**
     * A series of methods that grid invokes asynchronously anytime refresh is required. 
     * Please see PipeModel section for more information on grid refresh	 
	 */
	pipe?: ((memo: any, context: PipeContext, next: (memo: any) => void) => any)[];

	/**
	 * A set of 2 methods to identify column and row id. Note that if result id
	 * is not unique q-grid behavior can be unpredictable. 
	 * By default: 
	 * 
	 * * `row` method is an identity function.
	 * * `column` method return column key property.
	 */
	id?: {
		row: (index: number, row: any) => any,
		column: (index: number, column: ColumnModel) => any,
	};
}
