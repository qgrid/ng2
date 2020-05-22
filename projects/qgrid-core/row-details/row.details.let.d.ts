import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class RowDetailsLet {
	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	readonly toggleStatus: Command<any>;
	status(row: any): boolean;
}
