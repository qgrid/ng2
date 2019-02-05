import { Command } from './command';

/**
 * Command resolution manager that controls what commands and in which order columns should be executed.
 * Usually other q-grid internal services use this class after some keyboard events.
 *
 * ### Suggested Links
 *
 * * [Command](/doc/api/command.html)
 * * [Shortcut](/doc/api/shortcut.html)
 */
export declare class CommandManager {
	constructor(apply?: (f: () => void) => void, context?: any);

	/**
	 * Execute commands in a manager specific way.
	 *
	 * @param commands list of commands to execute, usually come after filter invocation.
	 * @param source indicates a source of command execution.
	 */
	invoke(commands: Command[], source?: string): boolean;

	/**
	 * Filter out disabled commands, usually command `canExecute` method is used.
	 *
	 * @param commands list of commands that are candidates for execution.
	 * @param source indicates a source of command execution.
	 */
	filter(commands: Command[], source?: string): Command[];
}
