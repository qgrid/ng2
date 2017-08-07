import {Command} from './command';
import {CommandManager} from './command.manager';
import {INoopResult} from '../utility/utility';

export declare class Shortcut {
	constructor(manager: CommandManager);
	manager: CommandManager;
	commands: Command[];
	shortcuts: Map<any, any>;
	codeMap: Map<any, any>;
	canExecute(): boolean;
	off(): INoopResult;
	translate(e: KeyboardEvent): string;
	onKeyDown(e: KeyboardEvent): void;
	register(id: number, commands: Command[]): boolean;
	find(code: string): string[];
	test(shortcut: any, code: string): boolean;
	onDestroy(): void;
}
