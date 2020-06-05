import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const COLUMN_DROP_COMMAND_KEY: CommandKey<{ action: string, dragData: string, inAreaX: (x: HTMLElement) => boolean }>;

export declare class ColumnDropCommand extends Command<{ action: string, dragData: string, inAreaX: (x: HTMLElement) => boolean }> {
    constructor(plugin: GridPlugin);
}

