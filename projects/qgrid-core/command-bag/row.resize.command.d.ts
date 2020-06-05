import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const ROW_RESIZE_COMMAND_KEY: CommandKey<any>;

export declare class RowResizeCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}

