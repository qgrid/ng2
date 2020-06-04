import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { ColumnModel } from '../column-type/column.model';

export declare const FILTER_ROW_COMMIT_COMMAND_KEY: CommandKey<[ColumnModel, any]>;

export declare class FilterRowCommitCommand extends Command<[ColumnModel, any]> {
    constructor(plugin: GridPlugin);
}
