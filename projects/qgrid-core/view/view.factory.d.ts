import { CommandManager } from '../command/command.manager';
import { GridPlugin } from '../plugin/grid.plugin';

export declare function viewFactory(
	plugin: GridPlugin,
	commandManager: CommandManager,
	vscroll: any,
	selectors: any
): (host: any) => void;
