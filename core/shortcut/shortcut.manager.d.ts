import {flatten, isFunction, yes} from '../utility';
import {Command} from '../command/command';
import {CommandManager} from '@grid/core/infrastructure/command.manager';
import {Shortcut} from '@grid/core/shortcut/shortcut';

export interface IRegisterResult {
  (): void;
}

export declare class ShortcutManager {
	constructor();
	managerMap: Map<any, any>;
  register(manager: CommandManager, commands: Command[]): IRegisterResult;
	execute(code: string): boolean;
	findFactory(code: string): any[];
	test(shortcut: Shortcut, code: string): boolean;
}
