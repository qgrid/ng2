import { CommandManager } from '../command/command.manager';
import { ShortcutDispatcher } from './shortcut.dispatcher';
import { KeyCode } from './key.code';

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

	factory(commandManager: CommandManager): object;
	keyDown(e: any, source?: string): string[];
	register(commandManager: CommandManager, commands: any[]);
}
