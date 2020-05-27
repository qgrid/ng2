import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class HighlightLet {
	constructor(plugin: GridPlugin);

	readonly column: Command;
	readonly row: Command;
	readonly cell: Command;
	readonly clear: Command;
}
