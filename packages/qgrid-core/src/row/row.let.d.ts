import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class RowLet {
	readonly drop: Command<{ dragData: number }>;
	readonly drag: Command<{ dragData: number }>;

	readonly canMove: boolean;
	readonly canResize: boolean;

	constructor(plugin: GridPlugin, tagName: string);
}
