import {Table} from "../dom/table";
import {IFunc} from "../dom/view";
import {CommandManager} from "./command.manager";

export declare class TableCommandManager extends CommandManager {
	constructor(apply: IFunc, public table: Table);
}