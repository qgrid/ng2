import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const COLUMN_DRAG_COMMAND_KEY: CommandKey<{ data: string }>;

export declare class ColumnDragCommand extends Command<{ data: string }> {
    constructor(plugin: GridPlugin);
}

