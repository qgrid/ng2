import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const HIGHLIGHT_ROW_COMMAND_KEY: CommandKey<[number, boolean]>;

export declare class HighlightRowCommand extends Command<[number, boolean]> {
    constructor(plugin: GridPlugin);
}

