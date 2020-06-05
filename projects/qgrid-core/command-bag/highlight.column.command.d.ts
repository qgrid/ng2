import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { ColumnModel } from '../column-type/column.model';

export declare const HIGHLIGHT_COLUMN_COMMAND_KEY: CommandKey<[ColumnModel, boolean]>;

export declare class HighlightColumnCommand extends Command<[ColumnModel, boolean]> {
    constructor(plugin: GridPlugin);
}

