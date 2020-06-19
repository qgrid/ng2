import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class RowDragCommand extends Command<{ data: number }> {
    constructor(plugin: GridPlugin);
}

