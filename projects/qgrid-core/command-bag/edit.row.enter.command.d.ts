import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const EDIT_ROW_CANCEL_COMMAND_KEY: CommandKey<any>;

export declare class EditRowCancelCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}
