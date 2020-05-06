import { Command } from '../command/command';
import { RowDetailsStatus } from '../row-details/row.details.status';

/**
 * Indicates how many detail items could be shown on the screen.
 * 
 * * `all` every row is opened and showing details.
 * * `single` only one row per time could show details.
 * * `multiple` several rows could show details.
 */
export declare type RowStateMode = 'all' | 'single' | 'multiple';

/**
 * Indicates if row details is turned on.
 */
export declare type RowStateUnit = 'data' | 'details';

/**
 * Row state.
 */
export declare class RowState {

	/**
	 * Indicates how many detail items could be shown on the screen.
	 */
	mode: RowStateMode;

	/**
	 * Indicates if row details is turned on.
	 */
	unit: RowStateUnit;

	height: (element: HTMLElement, index: number) => number | number;

	/**
	 * Indicates row details status, key is a data row value is a details status.
	 */
	status: Map<any, RowDetailsStatus>;

	/**
	 * Indicates if rows are movable.
	 */
	canMove: boolean;

	/**
	 * Indicates if rows are resizable.
	 */
	canResize: boolean;

	/**
	 * All data rows in this list will be pinned to top.
	 */
	pinTop: any[];

	/**
	 * All data rows in this list will be pinned to bottom.
	 */
	pinBottom: any[];

	toggle: Command<{ row: any }>;

	/**
	 * Keyboard shortcuts to control actions.
	 */
	shortcut: { [key: string]: string };
}
