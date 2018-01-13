import { IContext } from './context';

/**
 * A class 
 */
export declare class Command {
	constructor(context?: IContext);

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
	 * * `shift+a`
	 * * `ctrl+s`
	 * * `f2`
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
