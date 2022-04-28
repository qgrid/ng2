import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class RowDetailsLet {
	readonly toggleStatus: Command<any>;

	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	status(row: any): boolean;
}
