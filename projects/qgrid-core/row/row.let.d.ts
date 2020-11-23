import { DropCommandArg } from '../command-bag/command.bag';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class RowLet {
	constructor(plugin: GridPlugin, tagName: string);

	readonly drop: Command<DropCommandArg>;
	readonly drag: Command<{ dragData: number }>;

	readonly canMove: boolean;
	readonly canResize: boolean;
}
