import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class ScrollCommand extends Command<[number, number]> {
	constructor(plugin: GridPlugin);
}
