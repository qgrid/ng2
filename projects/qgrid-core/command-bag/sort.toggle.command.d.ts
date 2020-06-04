import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { ColumnModel } from '../column-type/column.model';

export declare const SORT_TOGGLE_COMMAND_KEY: CommandKey<ColumnModel>;

export declare class SortToggleCommand extends Command<ColumnModel> {
    constructor(plugin: GridPlugin);
}

