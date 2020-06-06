import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class RowDetailsLet {
	constructor(plugin: GridPlugin);

	readonly toggleStatus: Command<any>;

	status(row: any): boolean;
}
