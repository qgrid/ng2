import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const ROW_DETAILS_TOGGLE_STATUS_COMMAND_KEY: CommandKey<any>;

export declare class RowDetailsToggleStatusCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}
