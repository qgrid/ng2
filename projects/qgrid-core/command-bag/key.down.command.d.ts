import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class KeyDownCommand extends Command<string> {
	constructor(plugin: GridPlugin);
}
