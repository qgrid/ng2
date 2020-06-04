import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { CellView } from '../scene/view/cell.view';

export declare const EDIT_CELL_CLEAR_COMMAND_KEY: CommandKey<CellView>;

export declare class EditCellClearCommand extends Command<CellView> {
    constructor(plugin: GridPlugin);
}

