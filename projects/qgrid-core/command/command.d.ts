import { SubjectLike } from '../rx/rx';
import { CommandKey } from './command.key';

export interface CommandContext<T = any> {
    readonly key: CommandKey<T>;
    readonly priority: number;
    readonly execute: (e?: T) => any;
    readonly canExecute: (e?: T) => boolean;
    readonly shortcut: string;
}

/**
 * Use this class to implement command pattern in the qgrid. The most of interactions in the q-grid are utilized by this pattern.
 * 
 * ### Create a command using q-grid facade.
 *
 * ```javascript
 *	const addRowCommand = new Command({
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
 * * [Command Pattern Wiki](https://en.wikipedia.org/wiki/Command_pattern)
 */
export declare class Command<T = any> {
    constructor(context?: Partial<CommandContext<T>>);

    /**
     * Indicates if a command can be invoked. Use one argument to support typescript generic typification.
	 * By default true value is returned.
     */
    canExecute: (e?: T) => boolean;

    /**
     * Triggers canExecute method on UI.
     */
    canExecuteCheck: SubjectLike<T>;

    /**
     * Invokes the command. Use one argument to support typescript generic typification.
	 * Sometimes interaction model requires to return a value, for example, default command manager 
	 * stops to process next commands if `TRUE` is returned by the command execute method.
     */
    execute: (e?: T) => any;

    /**
     * A sequence of keyboard key codes to execute the command. 
	 * Here are some examples:
     *
     * * shift+a
     * * ctrl+s
     * * f2
     * * alt\+[0-1]
     */
    shortcut: (() => (string | RegExp)) | string | RegExp;

    /**
     * Command priority that can be used by command manager to specify order of commands to execute. 
	 * For example, if several commands have the same shortcut, you may need to see in which order 
	 * these commands should be executed.
     */
    priority: number;

	/**
	 * Indicates an origin of the command.
	 */
    key: CommandKey<T>;
}
