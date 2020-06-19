import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { CellView } from '../scene/view/cell.view';

export declare class EditCellPushCommand extends Command<CellView> {
    constructor(plugin: GridPlugin);
}

