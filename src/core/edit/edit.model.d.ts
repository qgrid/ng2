import { Resource } from '../resource/resource';
import { Command } from '../command/command';
import { ICommitShortcuts } from './commit.shortcuts';

/**
 * A class represent options to control q-grid edit mode.
 *
 * ### Suggested Links
 *
 * * [Edit Cell View](/doc/api/edit-cell-view.html)
 * * [Edit Row View](/doc/api/edit-row-view.html)
 */
export declare interface EditModel {
	resource?: Resource;

	/**
	 * Property that controls grid edit unit.
	 *
	 * * `'cell'` data is editable through the grid cells.
	 * * `'row'` data is editable through the grid rows.
	 */
	mode?: 'cell' | 'row';

	/**
	 * Indicates if q-grid is in `'edit'` or in a `'view'` mode.
	 */
	state?: 'edit' | 'view' | 'startBatch' | 'endBatch';

	/**
	 * Property that controls grid edit behavior.
	 *
	 * * `'batch'` bath update.
	 */
	method?: null | 'batch';

	/**
	 * Allows to the grid user to control if cell or row can be edited or not.
	 */
	enter?: Command;

	/**
	 * Allows to the grid user to control if new cell value can be stored in data source or not.
	 */
	commit?: Command;

	/**
	 * Allows to the grid user to control if cell can exit edit mode.
	 */
	cancel?: Command;

	/**
	 * Allows to the grid user to control if cell can exit edit mode.
	 */
	reset?: Command;

	/**
	 * Allows to the grid user to manage clear action behavior in edit mode.
	 */
	clear?: Command;

	/**
	 * Object that contains `{columnKey: keyboardKeys}` map, that is used by q-grid to manage
	 * when commit command should be execute on key down event.
	 */
	commitShortcuts?: ICommitShortcuts;
}
