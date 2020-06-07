import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const PAGINATION_NEXT_COMMAND_KEY: CommandKey<any>;

export declare class PaginationNextCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}
