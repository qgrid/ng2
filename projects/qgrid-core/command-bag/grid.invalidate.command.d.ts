import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { ModelChanges } from '../model/model.event';
import { PipeCallback, PipeUnitWhy } from '../pipe/pipe.types';

export declare type GridInvalidateCommandArg = {
    source: string,
    changes: ModelChanges<any>,
    pipe: PipeCallback<any, any>[],
    why: PipeUnitWhy
};

export declare const GRID_INVALIDATE_COMMAND_KEY: CommandKey<Partial<GridInvalidateCommandArg>>;

export declare class GridInvalidateCommand extends Command<Partial<GridInvalidateCommandArg>> {
    constructor(plugin: GridPlugin);
}

