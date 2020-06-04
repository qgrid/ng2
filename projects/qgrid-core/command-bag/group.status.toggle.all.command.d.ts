import { Command } from '../command/command';
import { CommandKey } from '../command/command.key';
import { GridPlugin } from '../plugin/grid.plugin';

export declare const GROUP_STATUS_TOGGLE_ALL_COMMAND_KEY: CommandKey<any>;

export declare class GroupStatusToggleAllCommand extends Command<any> {
	constructor(plugin: GridPlugin);
}
