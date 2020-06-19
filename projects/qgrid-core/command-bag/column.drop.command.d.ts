import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class ColumnDropCommand extends Command<{ action: string, dragData: string, inAreaX: (x: HTMLElement) => boolean }> {
    constructor(plugin: GridPlugin);
}

