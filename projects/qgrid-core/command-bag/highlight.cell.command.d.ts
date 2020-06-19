import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { CellViewPosition } from '../scene/view/cell.view';

export declare class HighlightCellCommand extends Command<CellViewPosition> {
    constructor(plugin: GridPlugin);
}

