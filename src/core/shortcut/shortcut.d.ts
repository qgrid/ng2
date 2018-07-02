import { ShortcutDispatcher } from './shortcut.dispatcher';
import { KeyCode } from './key.code';
import { CommandManager } from '../command/command.manager';
import { Command } from '../command/command';

/**
 * > Under construction.
 *
 * ### Suggested Links
 *
 * * [shortcut.manager.js](https://github.com/qgrid/ng2/blob/master/core/shortcut/shortuct.manager.js)
 * * [shortcut.dispatcher.js](https://github.com/qgrid/ng2/blob/master/core/shortcut/shortcut.dispatcher.js)
 */
export declare class Shortcut {
	constructor(manager: ShortcutDispatcher);

	static isControl(keyCode: KeyCode): boolean;
	static isPrintable(keyCode: KeyCode): boolean;
	static stringify(keyCode: KeyCode): string;
	static translate(e: any): string;

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
