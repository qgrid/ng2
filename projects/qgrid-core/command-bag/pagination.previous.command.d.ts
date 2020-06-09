import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const PAGINATION_PREVIOUS_COMMAND_KEY: CommandKey<any>;

export declare class PaginationPreviousCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}
