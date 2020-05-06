import { ShortcutDispatcher } from './shortcut.dispatcher';
import { KeyCode } from './key.code';
import { CommandManager } from '../command/command.manager';
import { Command } from '../command/command';

export declare class Shortcut {
	constructor(manager: ShortcutDispatcher);

	static isControl(keyCode: KeyCode): boolean;
	static isPrintable(keyCode: KeyCode): boolean;
	static stringify(keyCode: KeyCode): string;
	static translate(e: KeyboardEvent): string;

	factory(commandManager: CommandManager): {
		register: (commands: Command[]) => void
	};

	keyDown(
		e: {
			key: string, 
			keyCode: number, 
			shiftKey: boolean
		},
		source?: string): string[];

	register(commandManager: CommandManager, commands: Command[]): () => void;
}
