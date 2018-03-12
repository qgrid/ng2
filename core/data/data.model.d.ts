import {ColumnModel} from '../column-type/column.model';
import {IMemo} from '../pipe/pipe.item';

/**
 * A class that gives access to the high level grid data structures.
 *
 * ### Usage
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
 *
 * ### Suggested Links
 *
 * * [data.pipe.js](https://github.com/qgrid/ng2/blob/master/core/pipe/data.pipe.js)
 */
export declare class DataModel {

	/**
	 * List of data rows to display.
	 * Usually data rows can be setup from different places:
	 *
	 * * Rows `binding` property, `<q-grid [rows]="userRows">`
	 * * Through q-grid mode data rows property.
	 */
	rows: any[];

	/**
	 * Set of columns to display.
	 * Usually data columns can be setup from different places for the same grid:
	 *
	 * * Columns `binding` property, `<q-grid [columns]="userColumns">`.
	 * * Columns component, `<q-grid-columns>`.
	 * * Through q-grid model data columns property.
	 *
	 * We can have different sources of columns because each column has `key` property,
	 * that allows to make a merge. If you have defined columns in javascript and in template
	 * with the same key, algorithm will try persist settings from both sources but
	 * javascript will have top priority.
	 */
	columns: ColumnModel[];

	/**
	 * Chain of methods that grid invokes asyncroniuosly anytime refresh is required,
	 * see `PipeModel` that contains information when grid demands refreshing.
	 */
	pipe: ((memo: any, context: IContext, next: (param: IMemo) => void) => any)[];
}
