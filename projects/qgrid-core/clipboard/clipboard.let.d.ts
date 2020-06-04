import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class ClipboardLet {
	constructor(plugin: GridPlugin);

	readonly copy: Command;
}
