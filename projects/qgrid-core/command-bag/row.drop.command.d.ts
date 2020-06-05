import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const ROW_DROP_COMMAND_KEY: CommandKey<{ dragData: number, action: string, inAreaY: (x: HTMLElement) => boolean }>;

export declare class RowDropCommand extends Command<{ dragData: number, action: string, inAreaY: (x: HTMLElement) => boolean }> {
    constructor(plugin: GridPlugin);
}

