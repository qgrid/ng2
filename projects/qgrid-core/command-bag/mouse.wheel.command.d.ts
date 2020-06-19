import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class MouseWheelCommand extends Command<number> {
	constructor(plugin: GridPlugin);
}
