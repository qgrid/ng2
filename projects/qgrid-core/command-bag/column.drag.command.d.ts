import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class ColumnDragCommand extends Command<{ data: string }> {
    constructor(plugin: GridPlugin);
}

