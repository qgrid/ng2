import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const SELECTION_COLUMN_TOGGLE_ACTIVE_COMMAND_KEY: CommandKey<any>;

export declare class SelectionColumnToggleActiveCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}

