import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class RowDropCommand extends Command<{ dragData: number, action: string, inAreaY: (x: HTMLElement) => boolean }> {
    constructor(plugin: GridPlugin);
}

