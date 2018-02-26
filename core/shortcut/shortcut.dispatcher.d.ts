import { Command } from '../command/command';
import { CommandManager } from '../command/command.manager';

export declare class ShortcutDispatcher {
	constructor();

	register(manager: CommandManager, commands: Command[]);
	execute(code: string);
	canExecute(code: string);
}
