import { CommandContext } from './command.context';

/**
 * Use this class to implement command pattern in the qgrid. The most of interactions in the q-grid are utilized by this pattern.
 * 
 * ### Create a command using q-grid facade.
 *
 * ```javascript
 *	const addRowCommand = new qgrid.Command({
 *	   canExecute: () => true,	    
 *	   execute: () => {
 *	      const newRow = {
 *			 id: 1,
 *			 text: 'Lorem ipsum dolor sit amet'
 *	      };
 *
 *		  gridModel.data({
 *			 rows: gridModel.data().rows.concat(newRow)
 *		  });
 *	   },
 *	   shortcut: 'F7'
 *  });
 * ```
 *
 * ### Suggested Links.
 *
 * * [Action Model](/doc/api/action-model.html)
 * * [Action](/doc/api/action.html)
 * * [Service](/doc/api/grid.html)
 * * [Command Pattern Wiki](https://en.wikipedia.org/wiki/Command_pattern)
 */
export declare class Command<T = any> {
    constructor(context?: CommandContext<T>);

    /**
     * Indicates if a command can be invoked. Use one argument to support typescript generic typification.
	 * By default true value is returned.
     */
    canExecute: (e?: T, ...args: any[]) => boolean;

    /**
     * Invokes the command. Use one argument to support typescript generic typification.
	 * Sometimes interaction model requires to return a value, for example, default command manager 
	 * stops to process next commands if false is returned by the command execute method.
     */
    execute: (e?: T, ...args: any[]) => any;

    /**
     * A sequence of keyboard key codes to execute the command. 
	 * Here are some examples:
     *
     * * shift+a
     * * ctrl+s
     * * f2
     *
     */
    shortcut?: string;

    /**
     * Command priority that can be used by command manager to specify order of commands to execute. 
	 * For example, if several commands have the same shortcut, you may need to see in which order 
	 * these commands should be executed.
     */
    priority?: number;

	/**
	 * Idicates an origin of the command.
	 */
	source?: string;
	
	/**
	 * If a command is executed by q-grid command manager, the sink value contains 
	 * the last canExecute result. 
	 */
	sink?: any;
}
