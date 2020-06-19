import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class HighlightRowCommand extends Command<[number, boolean]> {
    constructor(plugin: GridPlugin);
}

