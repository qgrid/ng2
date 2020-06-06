import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const SELECTION_TOGGLE_COMMAND_KEY: CommandKey<any | any[]>;

export declare class SelectionToggleCommand extends Command<any | any[]> {
    constructor(plugin: GridPlugin);
}

