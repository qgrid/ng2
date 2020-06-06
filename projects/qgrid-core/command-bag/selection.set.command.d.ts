import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const SELECTION_SET_COMMAND_KEY: CommandKey<[any, boolean]>;

export declare class SelectionSetCommand extends Command<[any, boolean]> {
    constructor(plugin: GridPlugin);
}

