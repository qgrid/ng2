import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { CellView } from '../scene/view/cell.view';

export declare const SELECTION_CELL_TOGGLE_COMMAND_KEY: CommandKey<CellView>;

export declare class SelectionCellToggleCommand extends Command<CellView> {
    constructor(plugin: GridPlugin);
}

