import { Command } from '../command/command';

/**
 * Property that controls grid edit unit.
 *
 * * `'cell'` data is editable through the grid cells.
 * * `'row'` data is editable through the grid rows.
 * * `'null'` data is not editable.
 */
export declare type EditStateMode = null | 'cell' | 'row';

/**
 * Indicates if q-grid is in `'edit'` or in a `'view'` mode.
 */
export declare type EditStateStatus = 'edit' | 'view' | 'startBatch' | 'endBatch';

/**
 * Property that controls grid edit behavior.
 *
 * * `'batch'` batch update.
 */
export declare type EditStateMethod = null | 'batch';

/**
 * A class represent options to control q-grid edit mode.
 */
export declare class EditState {
	/**
	 * Property that controls grid edit unit.
	 */
	mode: EditStateMode;

	/**
	 * Indicates if q-grid is in `'edit'` or in a `'view'` mode.
	 */
	status: EditStateStatus;

	/**
	 * Property that controls grid edit behavior.
	 */
	method: EditStateMethod;

	/**
	 * Allows to the grid user to control if cell or row can be edited or not.
	 */
	enter: Command;

	/**
	 * Allows to the grid user to control if new cell value can be stored in data source or not.
	 */
	commit: Command;

	/**
	 * Allows to the grid user to control if cell can exit edit mode.
	 */
	cancel: Command;

	/**
	 * Allows to the grid user to control if cell can exit edit mode.
	 */
	reset: Command;

	/**
	 * Allows to the grid user to manage clear action behavior in edit mode.
	 */
	clear: Command;

	/**
	 * Object that contains `{columnKey: keyboardKeys}` map, that is used by q-grid to manage
	 * when cancel command should be execute on key down event.
	 */
	cancelShortcuts: { [key: string]: string };

	/**
	 * Object that contains `{columnKey: keyboardKeys}` map, that is used by q-grid to manage
	 * when enter command should be execute on key down event.
	 */
	enterShortcuts: { [key: string]: string };

	/**
	 * Object that contains `{columnKey: keyboardKeys}` map, that is used by q-grid to manage
	 * when commit command should be execute on key down event.
	 */
	commitShortcuts: { [key: string]: string };
}
