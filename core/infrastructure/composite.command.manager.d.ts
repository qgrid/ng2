import {CommandManager} from "./command.manager";
import {IFunc} from "../dom/view";

export declare class CompositeCommandManager {
	constructor(public manager: CommandManager);

	keyDown(f: IFunc): void;

	canExecute(): boolean;

	execute(commands): boolean;
}