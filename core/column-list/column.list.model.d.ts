import { ColumnModel } from '../column-type/column.model';
import { GenerationMode } from './generation.mode';

/**
 * A class that responsible for the generation and order of columns.
 * 
 * ## Usage
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
 * ```html
 * <q-grid>
 *    <q-grid-columns>
 *       <q-grid-column type="number" canSort="false" canFilter="false"></q-grid-column>
 *    </q-grid-columns>
 * </q-grid>
 * ``` 
 */
export declare class ColumnListModel {
	constructor();

	/**
	 * When setup columns will be generated automatically based on passed data source.
	 * - `None` means auto generation is off.
	 * - `Deep` means that algorithm traverses all levels keys of the passed data source item.
	 * - `Shallow` means algoithm traverses only first level keys of the passed data source item.
	 */
	generation: GenerationMode;

	/**
	 * Contains array of column keys, the q-grid will order columns depending on this list.
	 * It is filled automatically by internal service.
	 */
	index: string[];

	/**
	 * List of columns from html template. Usually that kind of column is defined as `<q-grid-column>` in html.
	 */
	columns: ColumnModel[];

	/**
	 * If user omits key property while defining a column, this column goes to the reference
	 * object as `{columnType: myColumn}`. The reference settings will be applied for all
	 * column of appropriate type as defaults. 
	 */
	reference: object;
}
