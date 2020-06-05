import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { CellViewPosition } from '../scene/view/cell.view';

export declare const HIGHLIGHT_CELL_COMMAND_KEY: CommandKey<CellViewPosition>;

export declare class HighlightCellCommand extends Command<CellViewPosition> {
    constructor(plugin: GridPlugin);
}

