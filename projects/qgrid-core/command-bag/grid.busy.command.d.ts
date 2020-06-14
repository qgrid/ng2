import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const GRID_BUSY_COMMAND_KEY: CommandKey<any>;

export declare class GridBusyCommand extends Command<Partial<any> {
    constructor(plugin: GridPlugin);
}

