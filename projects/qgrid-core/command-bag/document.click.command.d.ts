import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class DocumentClickCommand extends Command<[HTMLElement, MouseEvent]> {
	constructor(plugin: GridPlugin);
}
