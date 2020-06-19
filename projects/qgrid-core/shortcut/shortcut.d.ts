import { Command } from '../command/command';
import { CommandManager } from '../command/command.manager';

export declare class Shortcut {
	constructor(commandManager: CommandManager);

	getCommands(): Command<any>[];

	keyDown(code: string): boolean;

	keyUp(code: string): void;

	register(command: Command<any>): void;

	unregister(command: Command<any>): void;

	reset(): void;
}
