import { Action } from './action';
import { Shortcut } from '../shortcut/shortcut';
import { CommandManager } from '../command/command.manager';
import { Resource } from '../resource/resource';

/**
 * A class to handle and visualize in UI custom user behaviors(like add or delete row).
 * For instance, [action bar](/doc/feature/action.html) plugin uses this model to draw buttons on top of the q-grid
 * to execute user commands.
 *
 * ### Usage
 *
 * ```javascript
 * const addRowCommand = new qgrid.Command({
 *   execute: () => {
 *      const newRow = {
 *		 id: 1,
 *		 text: 'foo'
 *      };
 *
 *      gridModel.data({
 *        rows: gridModel.data().rows.concat(newRow)
 *      });
 *   },
 *   shortcut: 'F7'
 *});
 *
 * const addRowAction = new qgrid.Action({
 *    command: addRowCommand,
 *    title: 'Add new row',
 *    icon: 'add'
 * });
 *
 * gridModel.action({
 *    items: [addRowAction]
 * });
 * ```
 *
 * ### Suggested Links
 *
 * * [Action](/doc/api/action.html)
 * * [Command](/doc/api/command.html)
 * * [Action Bar](/doc/feature/action.html)
 * * [Shortcut](/doc/api/shortcut.html)
 * * [Command Manager](/doc/api/command-manager.html)
 */
export declare class ActionModel {
	constructor();

	resource: Resource;

	/**
	 * List of actions that will be added to the command manager,
	 * and binded to the keydown events.
	 */
	items: Action[];

	/**
	 * The service that connects keydown events and commands.
	 */
	shortcut: Shortcut;

	/**
	 * Command manager is responsible for the next questions:
	 * * What commands can be executed.
	 * * How(e.g. in which order) commands should be executed.
	 */
	manager: CommandManager;
}
