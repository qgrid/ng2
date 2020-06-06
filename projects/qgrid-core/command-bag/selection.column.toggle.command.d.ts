import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { ColumnModel } from '../column-type/column.model';

export declare const SELECTION_COLUMN_TOGGLE_COMMAND_KEY: CommandKey<ColumnModel>;

export declare class SelectionColumnToggleCommand extends Command<ColumnModel> {
    constructor(plugin: GridPlugin);
}

