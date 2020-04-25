import { Command } from '../command/command';
import { RowDetailsStatus } from '../row-details/row.details.status';

/**
 * Row model.
 *
 * ### Suggested Links
 *
 * * [Row View](/doc/api/row-view.html)
 */
export declare interface RowModel {

	/**
	 * Indicates how many detail items could be shown on the screen.
	 * 
	 * * `all` every row is opened and showing details.
	 * * `single` only one row per time could show details.
	 * * `multiple` several rows could show details.
	 */
	mode?: 'all' | 'single' | 'multiple';

	/**
	 * Indicates if row details is turned on.
	 */
	unit?: 'data' | 'details';

	height?: (element: HTMLElement, index: number) => number | number;

	/**
	 * Indicates row details status, key is a data row value is a details status.
	 */
	status?: Map<any, RowDetailsStatus>;

	/**
	 * Indicates if rows are movable.
	 */
	canMove?: boolean;

	/**
	 * Indicates if rows are resizable.
	 */
	canResize?: boolean;

	/**
	 * All data rows in this list will be pinned to top.
	 */
	pinTop?: any[];

	/**
	 * All data rows in this list will be pinned to bottom.
	 */
	pinBottom?: any[];

	/**
	 * 
	 */
	toggle?: Command<{ row: any }>;

	/**
	 * Keyboard shortcuts to control actions.
	 */
	shortcut?: { [key: string]: string };
}
