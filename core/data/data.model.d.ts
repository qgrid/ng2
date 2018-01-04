import { ColumnModel } from '../column-type/column.model';
import { IPipe } from '../pipe/pipe.item';

/**
 * A class that gives access to the high level grid data structures. 
 */
export declare class DataModel {

	/**
	 * List of rows to display.
	 * Rows property usually can be filled from the grid rows html.
	 */
	rows: any[];
	
	/**
	 * Set of columns to display.
	 * Columns property usually can be setup from the grid columns binding.
	 * List of columns inside html template is stored here too.
	 * We can have two+ sources of columns because it's possible to do merge using column `key` property.
	 * If you have defined columns in javascript and in template with the same key, 
	 * algorithm will try persist settings from both sources but javascript will have top priority.
	 */
	columns: ColumnModel[];

	/**
	 * Chaing of methods that grid invokes asyncroniuosly anytime refresh is required.
	 * see `PipeModel` that contains information when grid demands refreshing.
	 */
	pipe: IPipe[];
}
