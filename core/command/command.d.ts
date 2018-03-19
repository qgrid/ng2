import { ICommandContext } from './context';

/**
 * A class that implements command pattern in the q-grid.
 * Any q-grid actions are implemented through this pattern.
 *
 * ### Instanciate a Command
 *
 * ```javascript
 *	const addRowCommand = new qgrid.Command({
 *	   execute: () => {
 *	      const newRow = {
 *			 id: 1,
 *			 text: 'foo'
 *	      };
 *
 *        gridModel.data({
 *          rows: gridModel.data().rows.concat(newRow)
 *        });
 *	   },
 *	   shortcut: 'F7'
 *	});
 * ```
 *
 * ### Suggested Links
 *
 * * [Action Model](/doc/api/action-model.html)
 * * [Action](/doc/api/action.html)
 */
export declare class Command {
	constructor(context?: ICommandContext);

	/**
	 * Indicates if command is invokable.
	 */
	canExecute: (...args: any[]) => boolean;

	/**
	 * Invoke the command.
	 */
	execute: (...args: any[]) => any;

	/**
	 * Sequence of keyboard key codes, to execute the command.
	 *
	 * Some examples:
	 *
	 * * `'shift+a'`
	 * * `'ctrl+s'`
	 * * `'f2'`
	 *
	 */
	shortcut?: string;

	/**
	 * Command priority that can be used by `command manager` to specify order if commands to execute.
	 * One of the examples if several commands have the same shortcut, we need a way to understand
	 * in what order these commands should be executed.
	 */
	priority?: number;

	source?: string;
}
