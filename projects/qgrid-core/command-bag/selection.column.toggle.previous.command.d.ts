import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const SELECTION_COLUMN_TOGGLE_PREVIOUS_COMMAND_KEY: CommandKey<any>;

export declare class SelectionColumnTogglePreviousCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}

