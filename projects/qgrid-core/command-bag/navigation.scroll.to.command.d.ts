import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const NAVIGATION_SCROLL_TO_COMMAND_KEY: CommandKey<[number, number]>;

export declare class NavigationScrollToCommand extends Command<[number, number]> {
    constructor(plugin: GridPlugin);
}
