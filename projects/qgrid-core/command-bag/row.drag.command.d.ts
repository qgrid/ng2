import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const ROW_DRAG_COMMAND_KEY: CommandKey<{ data: number }>;

export declare class RowDragCommand extends Command<{ data: number }> {
    constructor(plugin: GridPlugin);
}

