import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { GridInvalidateCommandArg } from './command.bag';

export declare class GridInvalidateCommand extends Command<Partial<GridInvalidateCommandArg>> {
    constructor(plugin: GridPlugin);
}

