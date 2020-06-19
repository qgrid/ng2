import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { CellView } from '../scene/view/cell.view';

export declare class MouseUpCommand extends Command<[CellView, number]> {
	constructor(plugin: GridPlugin);
}
