import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const SELECTION_RANGE_COMMAND_KEY: CommandKey<any | any[]>;

export declare class SelectionRangeCommand extends Command<any | any[]> {
    constructor(plugin: GridPlugin);
}

