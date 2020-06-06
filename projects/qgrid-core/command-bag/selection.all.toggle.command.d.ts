import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const SELECTION_ALL_TOGGLE_COMMAND_KEY: CommandKey<any>;

export declare class SelectionRowToggleCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}

