import { Command } from './command';

/**
 * Command resolution manager that controls what commands and in which order columns should be executed.
 * Usually other q-grid internal services use this class after some keyboard events.
 *
 */
export declare class CommandManager {
	constructor();

	/**
	 * Execute commands in a manager specific way.
	 */
	invoke(commands: Command[], arg?: any): boolean;

	/**
	 * Filter out disabled commands, usually command `canExecute` method is used.
	 */
	filter(commands: Command[]): Command[];
}
