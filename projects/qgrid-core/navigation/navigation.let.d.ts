import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';


export declare class NavigationLet {
	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	readonly focus: Command;
	readonly scrollTo: Command;
}
