import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const SELECTION_COLUMN_TOGGLE_NEXT_COMMAND_KEY: CommandKey<any>;

export declare class SelectionColumnToggleNextCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}

