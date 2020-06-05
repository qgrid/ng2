import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class NavigationLet {
	constructor(plugin: GridPlugin);

	readonly focus: Command<{ rowIndex: number, columnIndex: number, behavior: string }>;
	readonly scrollTo: Command<any>;
}
