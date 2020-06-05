import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { CellView } from '../scene/view/cell.view';

export declare const HIGHLIGHT_CLEAR_COMMAND_KEY: CommandKey<any>;

export declare class HighlightClearCommand extends Command<any> {
    constructor(plugin: GridPlugin);
}

