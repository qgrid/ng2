import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const EDIT_ROW_RESET_COMMAND_KEY: CommandKey<any>;

export declare class EditRowResetCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}
