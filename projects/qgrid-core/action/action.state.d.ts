import { Action } from './action';

/**
 * Use this class to handle and visualize custom user behaviors.
 * [action bar](/doc/feature/action.html) plugin uses this model to draw buttons on the top of q-grid to execute user commands.
 *
 * ### Usage
 *
 * ```javascript
 * const addRowCommand = new Command({
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
 * const addRowAction = new Action({
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
 */
export declare class ActionState {
	/**
	 * List of actions that will be added to the command manager,
	 * and bind to the keyboard events.
	 */
	items: Action[];
}
