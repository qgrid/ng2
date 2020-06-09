import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const SELECTION_ROW_TOGGLE_NEXT_COMMAND_KEY: CommandKey<any>;

export declare class SelectionRowToggleNextCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}

