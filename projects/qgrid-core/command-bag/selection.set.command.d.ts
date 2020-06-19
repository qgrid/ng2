import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class SelectionSetCommand extends Command<[any, boolean]> {
    constructor(plugin: GridPlugin);
}

