import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const NAVIGATION_FOCUS_COMMAND_KEY: CommandKey<{rowIndex: number, columnIndex: number, behavior: string}>;

export declare class NavigationFocusCommand extends Command<{rowIndex: number, columnIndex: number, behavior: string}> {
    constructor(plugin: GridPlugin);
}
