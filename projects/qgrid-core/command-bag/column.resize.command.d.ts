import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class ColumnResizeCommand extends Command<{ data: string }> {
    constructor(plugin: GridPlugin);
}

