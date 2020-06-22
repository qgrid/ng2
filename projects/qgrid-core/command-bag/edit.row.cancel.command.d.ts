import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const EDIT_ROW_ENTER_COMMAND_KEY: CommandKey<any>;

export declare class EditRowEnterCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}
