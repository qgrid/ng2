import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';
import { ColumnModel } from '../column-type/column.model';

export declare const GROUP_STATUS_TOGGLE_COMMAND_KEY: CommandKey<[ColumnModel, any]>;

export declare class GroupToggleStatusCommand extends Command<[ColumnModel, any]> {
	constructor(plugin: GridPlugin);
}
