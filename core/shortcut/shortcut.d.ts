import {Command} from '../command/command';
import {CommandManager} from '../command/command.manager';
import {INoopResult} from "../utility/utility";

export declare class Shortcut {
	constructor();
	register(commandManager, commands: Command[]): INoopResult;
	keyDown(e: any);
}